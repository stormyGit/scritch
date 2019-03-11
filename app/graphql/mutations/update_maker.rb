class Mutations::UpdateMaker < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :name, String, required: true
  argument :country, String, required: false
  argument :region, String, required: false
  argument :avatar, String, required: false
  argument :web, String, required: false

  field :maker, Types::MakerType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    maker = Maker.find(arguments[:id])
    maker.assign_attributes(arguments)

    raise Pundit::NotAuthorizedError unless MakerPolicy.new(context[:current_user], maker).update?

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
