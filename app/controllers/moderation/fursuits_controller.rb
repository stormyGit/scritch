class Moderation::FursuitsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!

  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @fursuits = Fursuit.all.order(:name)

    @fursuits = @fursuits.page(params[:page]).per(30)
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
      :fursuit_specy_id,
      :fursuit_style_id,
      :fursuit_padding_id,
      :fursuit_finger_id,
      :fursuit_build_id,
      :base_color,
      :eyes_color,
      :fursuit_leg_type_id,
      :creation_year,
      :slug,
      maker_ids: []
    ]))
    fursuit.avatar =
      if (fursuit.is_hybrid)
        File.open("app/assets/images/species/Hybrid.png")
      else
        begin
          File.open("app/assets/images/species/#{fursuit.fursuit_specy.name}.png")
        rescue
          File.open("app/assets/images/species/Missingno (No Avatar Graphic Found).png")
        end
      end
    #    authorize fursuit
    fursuit.save!
    flash[:notice] = "Fursuit added!"
    flash[:class] = ""
    redirect_to moderation_fursuits_path
  end

  def edit
    @fursuit = Fursuit.find(params[:id])
  end

  def update
    fursuit = Fursuit.find(params[:id])
    fursuit.assign_attributes(params.require(:fursuit).permit([
      :user_id,
      :name,
      :fursuit_specy_id,
      :fursuit_style_id,
      :fursuit_padding_id,
      :fursuit_finger_id,
      :fursuit_build_id,
      :base_color,
      :eyes_color,
      :fursuit_leg_type_id,
      :creation_year,
      :slug,
      maker_ids: []
    ]))

    #    authorize fursuit
    fursuit.save!
    flash[:notice] = "Fursuit updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_fursuit_path(fursuit)
  end

  def destroy
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
