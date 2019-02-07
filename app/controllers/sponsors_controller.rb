class SponsorsController < ApplicationController
  before_action :get_session
  before_action :check_eligible, only: [:new, :create]
  before_action :check_sponsorship, only: [:cancel]
  before_action :set_cache_headers
  skip_before_action :verify_authenticity_token, only: :charge

  def new

  end

  def charge
    ChargeSuccess.new(id: params[:data][:object][:customer]).process
    render body: nil, status: 201
  rescue Stripe::APIConnectionError, Stripe::StripeError
    render body: nil, status: 400
  end

  def create
    # Amount in cents
    subType = params[:sub]

    if @current_session.present? && @current_session.user.sponsor.blank?

      customer = Stripe::Customer.create(
        :email => params[:stripeEmail],
        :source  => params[:stripeToken])

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

      @amount = subType.present? && subType == ENV["MONTH_SUB_ID"] ? "$1.00"
        : subType.present? && subType == ENV["YEAR_SUB_ID"] ?
          "$5.00" : "N/A"

      sponsor = Sponsor.create(
        user: @current_session.user,
        charge: charge,
        customer: customer,
        status: "pending",
        charge_id: charge[:id],
        customer_id: customer[:id]
      )
    end

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_sponsor_path
  end

  def cancel
    sponsor = Stripe::Subscription.retreive(
      Sponsor.find_by(user: @current_session.user).charge.id
    )
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

  def check_sponsorship
    if @current_session.blank? || @current_session.user.sponsor.blank?
      redirect_to root_path
    end
  end

  def set_cache_headers
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end
end
