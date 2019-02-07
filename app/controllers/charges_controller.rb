class ChargesController < ApplicationController
  before_action :get_session

  def new

  end

  def create
    # Amount in cents
    @amount = 500
    puts "\n\n\n\n\n\n\n#{params}\n\n\n\n\n\n\n"

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Subscription.create(
      :customer    => customer.id,
      :items        => [
        :plan        => :monthly
      ]
    )

  puts "\n\n\nCHARGE\n\n#{params[:stripeToken]}\n\n#{charge}\n\n\n\n\n\n\n"
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  private

  def get_session
    @current_session ||= Session.find_by(uuid: cookies.signed[:token])
  end
end
