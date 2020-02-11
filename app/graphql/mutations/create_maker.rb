class Mutations::CreateMaker < Mutations::BaseMutation
  argument :name, String, required: true
  argument :bio, String, required: false
  argument :country, String, required: false
  argument :visible, Boolean, required: false
  argument :region, String, required: false
  argument :avatar, String, required: false
  argument :web, String, required: false
  argument :request_id, ID, required: false

  field :maker, Types::MakerType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    maker = Maker.new
    maker.assign_attributes(arguments.except(:request_id))

    raise Pundit::NotAuthorizedError unless MakerPolicy.new(context[:current_user], maker).create?


    if arguments[:request_id].present?
      maker_request = AssetRequest.find(arguments[:request_id])
      maker_request.update(status: "accepted")
      maker_request.create_activity :accepted, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_request.user
    end

    maker.commission_status = CommissionStatus.find_by(name: "Closed")
    begin
      maker.avatar = File.open("app/assets/images/makers/Scritch Maker Thumbnail - #{maker.country}.png")
    rescue
      maker.avatar = File.open("app/assets/images/makers/FAILED.png")
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
