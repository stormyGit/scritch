class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  before_action :initialize_meta

  def index
  end
  layout :layout_by_resource

    private

    def layout_by_resource
      if devise_controller?
        "moderation"
      else
        "application"
      end
    end
  protected

  def initialize_meta
    @meta = {}
  end
end
