class Mutations::RemoveSuspension < Mutations::BaseMutation
  argument :id, ID, required: true

  field :suspended_user, Types::SuspendedUserType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    suspended_user = SuspendedUser.find(arguments[:id])

    # raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).destroy?

    if suspended_user.destroy
      {
        suspended_user: suspended_user,
        errors: [],
      }
    else
      {
        suspended_user: suspended_user,
        errors: suspended_user.errors.full_messages
      }
    end
  end
end
