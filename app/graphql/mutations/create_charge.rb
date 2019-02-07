class Mutations::CreateCharge < Mutations::BaseMutation
  argument :id, ID, required: true

  def resolve(arguments)
    puts "\n\n\n\n\n\n#{arguments}\n\n\n\n\n\n\n"
    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    #raise Pundit::NotAuthorizedError unless FollowPolicy.new(context[:current_user], follow).create?

    charge.to_json
  end
end
