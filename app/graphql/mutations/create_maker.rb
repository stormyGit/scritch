class Mutations::CreateMaker < Mutations::BaseMutation
  argument :name, String, required: true
  argument :bio, String, required: false
  argument :country, String, required: false
  argument :visible, Boolean, required: false
  argument :region, String, required: false
  argument :avatar, String, required: false
  argument :web, String, required: false

  field :maker, Types::MakerType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    maker = Maker.new
    maker.assign_attributes(arguments)

    raise Pundit::NotAuthorizedError unless MakerPolicy.new(context[:current_user], maker).create?

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
