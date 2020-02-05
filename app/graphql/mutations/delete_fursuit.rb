class Mutations::DeleteFursuit < Mutations::BaseMutation
  argument :id, ID, required: true

  field :fursuit, Types::FursuitType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    fursuit = Fursuit.find(arguments[:id])

    raise Pundit::NotAuthorizedError unless FursuitPolicy.new(context[:current_user], fursuit).destroy?

    if fursuit.destroy
      {
        fursuit: fursuit,
        errors: [],
      }
    else
      {
        fursuit: fursuit,
        errors: fursuit.errors.full_messages
      }
    end
  end
end
