class Moderation::BannedUsersController < ModerationController
  before_action :load_banned_user, only: [
    :show,
    :destroy
  ]
  before_action :ensure_banned_users_capability!

  def index
    @banned_users = BannedUser
      .order(created_at: :desc)
  end

  def show
  end

  def destroy
    @banned_user.destroy!

    redirect_back fallback_location: moderation_banned_users_url
  end

  protected

  def load_banned_user
    @banned_user = BannedUser.find(params[:id] || params[:banned_user_id])
  end

  def ensure_banned_users_capability!
    ensure_capability! "banned_users"
  end
end
