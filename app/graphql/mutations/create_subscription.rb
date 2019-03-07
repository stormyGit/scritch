class Mutations::CreateSubscription < Mutations::BaseMutation
  argument :fursuit_id, ID, required: true

  field :subscription, Types::FursuitSubscriptionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    subscription = FursuitSubscription.new({
      user: context[:current_user],
      fursuit_id: arguments[:fursuit_id]
    })

  #  raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).create?

    if subscription.save
      {
        subscription: subscription,
        errors: [],
      }
    else
      {
        subscription: nil,
        errors: subscription.errors.full_messages
      }
    end
  end
end
