class Mutations::DeleteMaker < Mutations::BaseMutation
  argument :id, ID, required: true

  field :maker, Types::MakerType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    maker = Maker.find(arguments[:id])

    raise Pundit::NotAuthorizedError unless MakerPolicy.new(context[:current_user], maker).destroy?

    if maker.destroy
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
