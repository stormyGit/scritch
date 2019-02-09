class AdvertsController < ApplicationController
  before_action :get_session
  before_action :check_advertiser
  before_action :get_advert, only: [:destroy, :update]
  before_action :get_adverts, only: [:index]
  skip_before_action :verify_authenticity_token, only: :charge

  def index

  end

  def update
    @advert.update!(status: params[:status])
    redirect_back fallback_location: adverts_path
  end

  def charge
  #   if params[:type] == "charge.succeeded"
  #     ChargeSuccess.new(id: params[:data][:object][:customer]).process
  #   elsif params[:type] == "customer.subscription.deleted"
  #     SubscriptionCancel.new(id: params[:data][:object][:customer]).process
  #   end
  #   render body: nil, status: 201
  # rescue Stripe::APIConnectionError, Stripe::StripeError
  #   render body: nil, status: 400
  end

  def destroy

  end

  private

  def get_adverts
    @adverts = @current_session.user.advert
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
