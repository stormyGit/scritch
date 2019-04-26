class Moderation::SuspendedUsersController < ModerationController
  before_action :load_suspended_user, only: [
    :show,
    :destroy
  ]
  before_action :ensure_suspended_users_capability!

  def index
    @suspended_users = SuspendedUser
      .order(created_at: :desc)
  end

  def show
  end

  def destroy
    @suspended_user.destroy!

    redirect_back fallback_location: moderation_suspended_users_url
  end

  protected

  def load_suspended_user
    @suspended_user = SuspendedUser.find(params[:id] || params[:suspended_user_id])
  end

  def ensure_suspended_users_capability!
    ensure_capability! "suspended_users"
  end
end
