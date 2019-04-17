class Moderation::TooltipsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!

  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @tooltips = Tooltip.all.order(created_at: :desc)

    if params[:category].present?
      @tooltips = @tooltips.where("tooltips.category = ?", params[:category])
    end

    @tooltips = @tooltips.page(params[:page]).per(90)
  end

  def show
    @tooltip = Tooltip.find(params[:id])
  end

  def new

  end

  def create
    tooltip = Tooltip.new
    tooltip.assign_attributes(params.require(:tooltip).permit([
      :file,
      :category,
      :public
    ]))

    #    authorize tooltip
    tooltip.save!
    flash[:notice] = "Tooltip added!"
    flash[:class] = ""
    redirect_to moderation_tooltips_path
  end

  def edit
    @tooltip = Tooltip.find(params[:id])
  end

  def update
    tooltip = Tooltip.find(params[:id])
    tooltip.assign_attributes(params.require(:tooltip).permit([
      :file,
      :category,
      :public
    ]))

    #    authorize tooltip
    tooltip.save!
    flash[:notice] = "Tooltip updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_tooltip_path(tooltip)
  end

  def destroy
    tooltip = Tooltip.find(params[:id])
    tooltip.destroy!

    flash[:notice] = "Tooltip removed!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_tooltips_path
  end

  protected

  def ensure_assets_capability!
    ensure_capability! "tooltips"
  end
end
