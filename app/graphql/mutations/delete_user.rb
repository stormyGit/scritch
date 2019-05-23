class Mutations::DeleteUser < Mutations::BaseMutation
  argument :id, ID, required: true

  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    user = User.find(arguments[:id])

    raise Pundit::NotAuthorizedError unless UserPolicy.new(context[:current_user], user).destroy?
    puts "\n" * 30

    puts "\n" * 30
    if user.sponsor.present?
      sponsor = Stripe::Subscription.retrieve(
        user.sponsor.charge_id
      )
      sponsor.delete
    end

    if user.destroy
      {
        user: user,
        errors: [],
      }
    else
      {
        user: user,
        errors: user.errors.full_messages
      }
    end
  end
end
