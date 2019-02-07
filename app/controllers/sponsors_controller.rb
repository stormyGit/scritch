class SponsorsController < ApplicationController
  before_action :get_session
  before_action :check_eligible

  def new

  end

  def create
    # Amount in cents
    subType = params[:sub]

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge =
      if subType == ENV["MONTH_SUB_ID"]
        Stripe::Subscription.create(
          :customer    => customer.id,
          :items        => [
            :plan        => :monthly
          ]
        )
      elsif subType == ENV["YEAR_SUB_ID"]
        Stripe::Subscription.create(
          :customer    => customer.id,
          :items        => [
            :plan        => :yearly
          ]
        )
      end

  @amount = subType.present? && subType == ENV["MONTH_SUB_ID"] ? "$1.00" : subType.present? && subType == ENV["YEAR_SUB_ID"] ? "$5.00" : "N/A"

  sponsor = Sponsor.create(user: @current_session.user, charge: charge, customer: customer)

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_sponsor_path
  end

  private

  def get_session
    @current_session ||= Session.find_by(uuid: cookies.signed[:token])
  end

  def check_eligible
    if @current_session.blank? || @current_session.user.sponsor.present?
      redirect_to root_path
    end
  end

end
