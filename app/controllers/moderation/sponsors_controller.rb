class Moderation::SponsorsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!


  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @sponsors = Sponsor.all.order(created_at: :desc)

    if params[:where_status].present?
      @sponsors = @sponsors.where(status: params[:where_status])
    end

    @sponsors = @sponsors.page(params[:page]).per(90)
  end

  protected

  def ensure_assets_capability!
    ensure_capability! "sponsors"
  end
end
