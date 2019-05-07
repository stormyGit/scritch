class Moderation::FursuitsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!

  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @fursuits = Fursuit.all.order(:name)

    if params[:name].present?
      @fursuits = @fursuits.where("fursuits.name @@ ? or fursuits.name ilike ?", params[:name], "%#{params[:name]}%")
    end

    @fursuits = @fursuits.page(params[:page]).per(90)
  end

  def show
    @fursuit = Fursuit.find(params[:id])
  end

  def new

  end

  def create
    fursuit = Fursuit.new
    fursuit.assign_attributes(params.require(:fursuit).permit([
      :user_id,
      :name,
      :is_hybrid,
      :fursuit_style_id,
      :fursuit_padding_id,
      :fursuit_finger_id,
      :fursuit_build_id,
      :fursuit_gender_id,
      :base_color,
      :eyes_color,
      :fursuit_leg_type_id,
      :creation_year,
      :slug,
      species_ids: [],
      maker_ids: []
    ]))

    begin
      fursuit.avatar = File.open("app/assets/images/species/#{e[11]}.png")
    rescue
      fursuit.avatar = File.open("app/assets/images/species/FAILED.png")
    end
    #    authorize fursuit
    fursuit.save!
    flash[:notice] = "Fursuit added!"
    flash[:class] = ""
    redirect_to moderation_fursuits_path
  end

  def edit
    raise Pundit::NotAuthorizedError unless moderator_can_see?("delete_and_edit")
    @fursuit = Fursuit.find(params[:id])
  end

  def update
    raise Pundit::NotAuthorizedError unless moderator_can_see?("delete_and_edit")
    fursuit = Fursuit.find(params[:id])
    fursuit.assign_attributes(params.require(:fursuit).permit([
      :user_id,
      :name,
      :is_hybrid,
      :fursuit_style_id,
      :fursuit_padding_id,
      :fursuit_finger_id,
      :fursuit_build_id,
      :fursuit_gender_id,
      :base_color,
      :eyes_color,
      :fursuit_leg_type_id,
      :creation_year,
      :slug,
      species_ids: [],
      maker_ids: []
    ]))

    #    authorize fursuit
    fursuit.save!
    flash[:notice] = "Fursuit updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_fursuit_path(fursuit)
  end

  def destroy
    raise Pundit::NotAuthorizedError unless moderator_can_see?("delete_and_edit")
    fursuit = Fursuit.find(params[:id])
    fursuit.destroy!

    flash[:notice] = "Fursuit removed!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_fursuits_path
  end

  protected

  def ensure_assets_capability!
    ensure_capability! "assets"
  end
end
