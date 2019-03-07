class Mutations::DeleteSubscription < Mutations::BaseMutation
  argument :fursuit_id, ID, required: true

  field :subscription, Types::FursuitSubscriptionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    subscription = FursuitSubscription.find_by({
      user: context[:current_user],
      fursuit_id: arguments[:fursuit_id],
    })

    # raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).destroy?

    if subscription.destroy
      {
        subscription: subscription,
        errors: [],
      }
    else
      {
        subscription: subscription,
        errors: subscription.errors.full_messages
      }
    end
  end
end
