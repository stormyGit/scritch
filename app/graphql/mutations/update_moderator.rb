class Mutations::UpdateModerator < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :capabilities, [String], required: true

  field :moderator, Types::ModeratorType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    moderator = Moderator.find(arguments[:id])
    moderator.assign_attributes(arguments)

    # raise Pundit::NotAuthorizedError unless ModeratorPolicy.new(context[:current_user], moderator).update?
    sleep(1)
    if moderator.save
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
