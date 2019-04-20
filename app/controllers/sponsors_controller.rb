class SponsorsController < ApplicationController
  before_action :get_session
  # before_action :check_eligible, only: [:new, :create]
  # before_action :check_sponsorship, only: [:cancel]
  before_action :set_cache_headers
  skip_before_action :verify_authenticity_token, only: :charge

  def new
    raise Pundit::NotAuthorizedError unless SponsorPolicy.new(@current_session.user, nil).new?
  end

  def charge
    puts "\n" * 15
    puts "IN SPONSOR CONTROLLER CHARGE"
    puts params[:type]
    puts "\n" * 15
    if params[:type] == "charge.succeeded" && (params[:data][:object][:amount] == 1000 || params[:data][:object][:amount] == 100)
      ChargeSuccess.new(id: params[:data][:object][:customer]).process
    elsif params[:type] == "customer.subscription.deleted"
      puts params[:data][:object][:customer]
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
        end

      @amount = subType.present? && subType == ENV["MONTH_SUB_ID"] ? "$1.00"
        : subType.present? && subType == ENV["YEAR_SUB_ID"] ?
          "$10.00" : "N/A"

      @period = subType.present? && subType == ENV["MONTH_SUB_ID"] ? "/Mth"
        : subType.present? && subType == ENV["YEAR_SUB_ID"] ?
          "/Yr" : "N/A"

      user_plan = subType.present? && subType == ENV["MONTH_SUB_ID"] ? "monthly"
        : subType.present? && subType == ENV["YEAR_SUB_ID"] ? "yearly" : nil
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
      sponsor.user.create_activity :sponsorship_started, owner: Proc.new{ |_, model| User.last }, recipient: @current_session.user #TODO USER.MOD
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
    @current_session ||= Session.find_by(uuid: cookies.signed[:token])
  end

  def check_eligible
    # if @current_session.blank? || @current_session.user.sponsor.present? || @current_session.user.sponsor.status != "canceled"
    #   redirect_to root_path
    # end PUNDIT
  end

  def check_sponsorship
    # if @current_session.blank? || @current_session.user.sponsor.blank? || @current_session.user.sponsor.status != "live"
    #   redirect_to root_path
    # end #PUNDIT
  end

  def set_cache_headers
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end
end
