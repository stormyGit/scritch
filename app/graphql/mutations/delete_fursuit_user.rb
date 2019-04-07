class Mutations::DeleteFursuitUser < Mutations::BaseMutation
  argument :fursuit_id, ID, required: true

  field :fursuit_user, Types::FursuitUserType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    fursuit_user = FursuitUser.find_by(fursuit: arguments[:fursuit_id], user: context[:current_user])

    raise Pundit::NotAuthorizedError unless FursuitUserPolicy.new(context[:current_user], fursuit_user).destroy?

    if fursuit_user.destroy
      {
        fursuit_user: fursuit_user,
        errors: [],
      }
    else
      {
        fursuit_user: fursuit_user,
        errors: fursuit_user.errors.full_messages
      }
    end
  end
end
