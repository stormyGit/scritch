class SponsorsController < ApplicationController
  before_action :get_session
  # before_action :check_eligible, only: [:new, :create]
  # before_action :check_sponsorship, only: [:cancel]
  before_action :set_cache_headers
  skip_before_action :verify_authenticity_token, only: :charge

  def new
    render body: nil, status: 404 unless @current_session.present?

    if @current_session.present?
      raise Pundit::NotAuthorizedError unless SponsorPolicy.new(@current_session.user, nil).new?
    end
  end

  def success

  end

  def charge
    if params[:type] == "charge.succeeded" && (params[:data][:object][:amount] == 1000 || params[:data][:object][:amount] == 100 || params[:data][:object][:amount] == 499)
      ChargeSuccess.new(id: params[:data][:object][:customer]).process
    elsif params[:type] == "customer.subscription.deleted"
      SubscriptionCancel.new(id: params[:data][:object][:customer]).process
    end
    render body: nil, status: 201
  rescue Stripe::APIConnectionError, Stripe::StripeError
    render body: nil, status: 400
  end

  def create
    # Amount in cents
    raise Pundit::NotAuthorizedError unless SponsorPolicy.new(@current_session.user, nil).create?
    subType = params[:sub]

    if @current_session.present? && @current_session.user.sponsor.blank?

      if @current_session.user.sponsor.present?

        customer = Stripe::Customer.retrieve(@current_session.user.sponsor.customer_id)
        customer.source = params[:stripeToken]
      else
        customer = Stripe::Customer.create(
          :email => params[:stripeEmail],
          :source  => params[:stripeToken]
        )
      end
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
        elsif subType == ENV["SEMESTER_SUB_ID"]
          Stripe::Subscription.create(
            :customer    => customer.id,
            :items        => [
              :plan        => :semester
            ]
          )
        end

      @amount =
        case subType
          when ENV["MONTH_SUB_ID"]
            "£1.00"
          when ENV["YEAR_SUB_ID"]
            "£10.00"
          when ENV["SEMESTER_SUB_ID"]
            "£4.99"
          else
            "N/A"
          end

      @period =
        case subType
          when ENV["MONTH_SUB_ID"]
            "/Mth"
          when ENV["YEAR_SUB_ID"]
            "/Yr"
          when ENV["SEMESTER_SUB_ID"]
            "/6-Mth"
          else
            "N/A"
          end

      user_plan =
        case subType
          when ENV["MONTH_SUB_ID"]
            "monthly"
          when ENV["YEAR_SUB_ID"]
            "yearly"
          when ENV["SEMESTER_SUB_ID"]
            "semester"
          else
            nil
          end

      sponsor = Sponsor.create(
        user: @current_session.user,
        charge: charge,
        customer: customer,
        status: "pending",
        charge_id: charge[:id],
        customer_id: customer[:id],
        plan: user_plan
      )
    end

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_sponsor_path
  end

  def cancel
    raise Pundit::NotAuthorizedError unless SponsorPolicy.new(@current_session.user, nil).cancel?
  end

  def free_trial
    raise Pundit::NotAuthorizedError unless SponsorPolicy.new(@current_session.user, nil).free_trial?
    if @current_session.user.used_free_trial == false
      sponsor = Sponsor.create(
        user: @current_session.user,
        status: "live",
        plan: "Free Trial",
        limit: Time.now + 14.days
      )
      @current_session.user.update!(used_free_trial: true)
      sponsor.user.create_activity :sponsorship_started, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: @current_session.user
    end
    redirect_to root_path
  end

  def end_sponsorship
    sponsor = Sponsor.find(params[:sponsor_id])
    raise Pundit::NotAuthorizedError unless SponsorPolicy.new(@current_session.user, sponsor).destroy?
    stripeSponsor = Stripe::Subscription.retrieve(
      Sponsor.find(params[:sponsor_id]).charge_id
    )
    stripeSponsor.delete
  end

  private

  def get_session
    @current_session = Session.find_by(uuid: cookies.signed[:token])
  end

  def set_cache_headers
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end
end
