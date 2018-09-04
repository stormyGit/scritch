class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def index
  end

  def current_user
    User.first
  end
end
