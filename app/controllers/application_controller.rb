class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_csrf_token, if: :valid_request_origin?

  before_action :initialize_meta
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  def index
    if params[:god_mode].present? && params[:god_mode] == ENV["GOD_MODE_PWD"]
      cookies.signed["god-mode"] = ENV["GOD_MODE_TOKEN"]
    end
  end
  layout :layout_by_resource

  private

  def layout_by_resource
    if App.first.maintenance && cookies.signed["god-mode"].blank? || cookies.signed["god-mode"] != ENV["GOD_MODE_TOKEN"]
      return "maintenance"
    end
    if devise_controller?
      "moderation"
    elsif controller_name == "sponsors"
      "sponsors"
    elsif controller_name == "adverts"
      "adverts"
    else
      "application"
    end
  end

  protected

  def initialize_meta
    @meta = {
      "description": "The new place to go for everything Fursuit!"
      # "image": ActionController::Base.helpers.asset_url("logo.png"),
    }
  end

  def set_csrf_token
    cookies["csrf-token"] = {
      value: form_authenticity_token,
    }
  end

  def not_authorized
    render "errors/403", status: 403
  end
end
