class Mutations::CreateMakerSubscription < Mutations::BaseMutation
  argument :maker_id, ID, required: true

  field :subscription, Types::MakerSubscriptionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    subscription = MakerSubscription.new({
      user: context[:current_user],
      maker_id: arguments[:maker_id]
    })

  #  raise Pundit::NotAuthorizedError unless MakerSubscriptionPolicy.new(context[:current_user], subscription).create?

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
