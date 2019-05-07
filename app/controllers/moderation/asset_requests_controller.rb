class Moderation::AssetRequestsController < ModerationController
  before_action :load_asset_request, only: [
    :show,
    :dismiss,
    :reopen,
    :mark_as_accepted,
    :assign,
    :unassign
  ]
  before_action :ensure_asset_requests_capability!

  def index
    @asset_requests = AssetRequest
      .order(updated_at: :desc)
      .includes(:moderation_comments)
      .where(status: "new")

    if params[:assigned_to_me] == 'true'
      @asset_requests = @asset_requests.where(assignee: current_moderator)
    end
  end

  def show
  end

  def dismiss
    @asset_request.update(status: "dismissed")
    redirect_back fallback_location: moderation_asset_request_path(@asset_request)
    @asset_request.create_activity :rejected, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: @asset_request.user
  end

  def mark_as_accepted
    @asset_request.update(status: "accepted")
    @asset_request.create_activity :accepted, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: @asset_request.user
    redirect_back fallback_location: moderation_asset_request_path(@asset_request)
  end

  def reopen
    @asset_request.update(status: 'new')

    redirect_back fallback_location: moderation_asset_request_path(@asset_request)
  end

  def assign
    @asset_request.update(assignee: current_moderator)

    redirect_back fallback_location: moderation_asset_request_path(@asset_request)
  end

  def unassign
    @asset_request.update(assignee: nil)

    redirect_back fallback_location: moderation_asset_request_path(@asset_request)
  end

  protected

  def ensure_asset_requests_capability!
    ensure_capability! "assets"
  end

  def load_asset_request
    @asset_request = AssetRequest.find(params[:asset_request_id])
  end
end
