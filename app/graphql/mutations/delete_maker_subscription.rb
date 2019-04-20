class Mutations::DeleteMakerSubscription < Mutations::BaseMutation
  argument :maker_id, ID, required: true

  field :subscription, Types::MakerSubscriptionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    subscription = MakerSubscription.find_by({
      user: context[:current_user],
      maker_id: arguments[:maker_id],
    })

    # raise Pundit::NotAuthorizedError unless MakerSubscriptionPolicy.new(context[:current_user], subscription).destroy?

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
