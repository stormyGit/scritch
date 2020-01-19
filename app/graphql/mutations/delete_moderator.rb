class Mutations::DeleteModerator < Mutations::BaseMutation
  argument :id, ID, required: true

  field :moderator, Types::ModeratorType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    moderator = Moderator.find(arguments[:id])

    # raise Pundit::NotAuthorizedError unless ModeratorPolicy.new(context[:current_user], moderator).update?

    if moderator.destroy
      {
        moderator: moderator,
        errors: [],
      }
    else
      {
        moderator: moderator,
        errors: moderator.errors.full_messages
      }
    end
  end
end
