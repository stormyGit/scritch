class Moderation::ModeratorsController < ModerationController
  before_action :load_moderator, only: [
    :update,
    :destroy
  ]
  before_action :ensure_moderators_capability!

  def index
    @moderators = Moderator.order(created_at: :desc)
  end

  def update
    @moderator.update!(params.require(:moderator).permit(capabilities: []))

    redirect_back fallback_location: moderation_moderators_path
  end

  def destroy
    @moderator.destroy!

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
