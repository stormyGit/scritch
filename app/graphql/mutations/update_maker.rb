class Mutations::UpdateMaker < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :name, String, required: true
  argument :bio, String, required: false
  argument :country, String, required: false
  argument :commission_status_id, ID, required: false
  argument :region, String, required: false
  argument :avatar, String, required: false
  argument :web, String, required: false

  field :maker, Types::MakerType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    maker = Maker.find(arguments[:id])
    oldStatus = maker.commission_status.name
    newStatus =
      if arguments[:commission_status_id].present?
        CommissionStatus.find_by(uuid: arguments[:commission_status_id]).name
      else
        nil
      end
    maker.assign_attributes(arguments)

    raise Pundit::NotAuthorizedError unless MakerPolicy.new(context[:current_user], maker).update?

    if oldStatus == "Closed" && newStatus.present? && (newStatus == "Open" || newStatus == "Open (with conditions)")
      maker.subscribers.each do |e|
        maker.create_activity :commissions_open, owner: Proc.new{ |_, model| model }, recipient: e
      end
    end
    if (oldStatus == "Open" || oldStatus == "Open (with conditions") && newStatus.present? && newStatus == "Closed"
      Activity.where(trackable_type: "Maker", key: "maker.commissions_open", trackable_id: maker.uuid).each do |e|
        e.destroy
      end
    end
    if maker.save
      {
        maker: maker,
        errors: [],
      }
    else
      {
        maker: maker,
        errors: maker.errors.full_messages
      }
    end
  end
end
