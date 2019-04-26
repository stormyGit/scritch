class Moderation::AdvertsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!


  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @adverts = Advert.all.order(created_at: :desc)

    if params[:where_status].present?
      @adverts = @adverts.where(status: params[:where_status])
    end

    @adverts = @adverts.page(params[:page]).per(90)
  end

  def show
  end

  def edit
  end

  def reject
    advert = Advert.find(params[:advert_id])

    advert.create_activity :rejected, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: advert.user
    advert.status = "rejected"
    flash[:notice] = "Advert rejected!"
    flash[:class] = "has-text-danger"
    advert.save!
    redirect_to moderation_adverts_path
  end

  def approve
    advert = Advert.find(params[:advert_id])

    advert.create_activity :approved, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: advert.user
    advert.status = "ready"
    flash[:notice] = "Advert approved!"
    flash[:class] = "has-text-warning"
    advert.save!
    redirect_to moderation_adverts_path
  end

  def toggle_off
    advert = Advert.find(params[:advert_id])

    advert.status = "ready"
    flash[:notice] = "Advert approved!"
    flash[:class] = "has-text-warning"
    advert.save!
    redirect_to moderation_adverts_path
  end

  def destroy
    advert = Advert.find(params[:id])

    #TODO PUNDIT
    advert.destroy!
    flash[:notice] = "Advert deleted!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_adverts_path
  end

  def update

  end

  def new

  end

  protected

  def ensure_assets_capability!
    ensure_capability! "adverts"
  end
end
