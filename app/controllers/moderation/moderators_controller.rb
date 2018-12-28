class Moderation::ModeratorsController < ModerationController
  before_action :load_moderator, only: [
    :update,
    :destroy
  ]
  before_action :ensure_moderators_capability!

  def index
    @moderators = Moderator.order(created_at: :desc)
  end

  def new

  end

  def create
    moderator = Moderator.new
    moderator.assign_attributes(params.require(:moderator).permit([
      :name,
      :email
    ]))
    #    authorize moderator
    tmpPass = SecureRandom.base64
    moderator.password = tmpPass
    moderator.save!
    flash[:notice] = "Moderator added! #{tmpPass}"
    flash[:class] = ""
    redirect_to moderation_moderators_path
  end

  def update
    @moderator.update!(params.require(:moderator).permit(capabilities: []))

    flash[:notice] = "Moderator updated!"
    flash[:class] = "has-text-warning"
    redirect_back fallback_location: moderation_moderators_path
  end

  def destroy
    @moderator.destroy!

    flash[:notice] = "Moderator removed!"
    flash[:class] = "has-text-danger"
    redirect_back fallback_location: moderation_moderators_path
  end

  protected

  def ensure_moderators_capability!
    ensure_capability! "moderators"
  end

  def load_moderator
    @moderator = Moderator.find(params[:moderator_id] || params[:id])
  end
end
