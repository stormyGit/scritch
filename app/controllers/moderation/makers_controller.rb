class Moderation::MakersController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!

  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @makers = Maker.all.order(:name)

    if params[:name].present?
      @makers = @makers.where("makers.name @@ ? or makers.name ilike ?", params[:name], "%#{params[:name]}%")
    end

    @makers = @makers.page(params[:page]).per(90)
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
      :name,
      :web,
      :country,
      :region
    ]))
    #    authorize maker
    maker.commission_status = CommissionStatus.find_by(name: "Closed")
    begin
      maker.avatar = File.open("app/assets/images/makers/Scritch Maker Thumbnail - #{maker.country}.png")
    rescue
      maker.avatar = File.open("app/assets/images/makerPlaceholder.png")
    end
    maker.save!
    flash[:notice] = "Maker added!"
    flash[:class] = ""
    redirect_to moderation_makers_path
  end

  def edit
    raise Pundit::NotAuthorizedError unless moderator_can_see?("delete_and_edit")
    @maker = Maker.find(params[:id])

  end

  def update
    raise Pundit::NotAuthorizedError unless moderator_can_see?("delete_and_edit")
    maker = Maker.find(params[:id])
    maker.assign_attributes(params.require(:maker).permit([
      :user_id,
      :name,
      :country,
      :web,
      :visible,
      :region
    ]))
    #    authorize maker
    maker.save!
    flash[:notice] = "Maker updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_maker_path(id: maker.slug)
  end

  def destroy
    raise Pundit::NotAuthorizedError unless moderator_can_see?("delete_and_edit")
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
