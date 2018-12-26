class Moderation::MakersController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!

  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @makers = Maker.all.order(:name)

    @makers = @makers.page(params[:page]).per(30)
  end

  def show
    @maker = Maker.find(params[:id])
  end

  def new

  end

  def create
    maker = Maker.new
    maker.assign_attributes(params.require(:maker).permit([
      :user_id,
      :name
    ]))
    #    authorize maker
    maker.save!
    flash[:notice] = "Maker added!"
    flash[:class] = ""
    redirect_to moderation_makers_path
  end

  def edit
    @maker = Maker.find(params[:id])

  end

  def update
    maker = Maker.find(params[:id])
    maker.assign_attributes(params.require(:maker).permit([
      :user_id,
      :name
    ]))
    #    authorize maker
    maker.save!
    flash[:notice] = "Maker updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_makers_path
  end

  def destroy
    maker = Maker.find(params[:id])
    maker.destroy!

    flash[:notice] = "Maker removed!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_makers_path
  end

  protected

  def ensure_assets_capability!
    ensure_capability! "assets"
  end
end
