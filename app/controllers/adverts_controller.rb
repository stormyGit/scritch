class AdvertsController < ApplicationController
  before_action :get_session
  before_action :check_advertiser, except: [:charge]
  before_action :get_advert, only: [:destroy, :update, :go_to]
  before_action :get_adverts, only: [:index]
  skip_before_action :verify_authenticity_token, only: :charge

  def index

  end

  def go_to
    @advert.update!(clicks: @advert.clicks + 1)
    redirect_to @advert.url
  end

  def update
    @advert.update!(status: params[:status])
    redirect_back fallback_location: adverts_path
  end

  def refill
    # Amount in cents
    impressions = params[:impressions]
    if @current_session.present? && @current_session.user.advert.present?
      if @current_session.user.customer.present?

        customer = Stripe::Customer.retrieve(@current_session.user.customer["id"])
        customer.source = params[:stripeToken]
      else
        customer = Stripe::Customer.create(
          :email => params[:stripeEmail],
          :source  => params[:stripeToken]
        )
      end
      @current_session.user.update!(customer: customer, customer_id: customer.id)

      charge =
        if impressions == "1"
          Stripe::Charge.create(
            amount: 600,
            currency: 'usd',
            description: '100k ad impressions',
            customer: customer["id"]
          )
        elsif impressions == "2"
          Stripe::Charge.create(
            amount: 5000,
            currency: 'usd',
            description: '1 million ad impressions',
            customer: customer["id"]
          )
        elsif impressions == "3"
          Stripe::Charge.create(
            amount: 40000,
            currency: 'usd',
            description: '10 million ad impressions',
            customer: customer["id"]
          )
        end
      @current_session.user.update!(charge: charge, charge_id: charge.id)
    end
    redirect_to adverts_path
    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_sponsor_path
  end

  def charge
    if params[:type] == "charge.succeeded" && (params[:data][:object][:amount] == 600 || params[:data][:object][:amount] == 5000  || params[:data][:object][:amount] == 40000)
      AdvertChargeSuccess.new(params[:data][:object][:customer], params[:data][:object][:amount]).process
    end
    render body: nil, status: 201
  rescue Stripe::APIConnectionError, Stripe::StripeError
    render body: nil, status: 400
  end

  def destroy

  end

  private

  def get_adverts
    @adverts = @current_session.user.advert.order(created_at: :desc)
    @impressions_count = Statistic.last.impressions - Statistic.last(2).first.impressions

    @expiry =
      if @adverts.where(status: "live").length == 0 || @impressions_count == 0
        "N/A"
      else
        Time.now() + ((@current_session.user.available_impressions / @impressions_count) / @adverts.where(status: "live").length).days #TODO get estimate
      end
  end

  def get_advert
    @advert = Advert.find(params[:id])
  end

  def get_session
    @current_session ||= Session.find_by(uuid: cookies.signed[:token])
  end

  def check_advertiser
    if @current_session.blank? || @current_session.user.advert.blank?
      redirect_to root_path
    end
  end
end
