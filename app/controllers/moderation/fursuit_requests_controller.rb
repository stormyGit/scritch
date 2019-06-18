class Moderation::FursuitRequestsController < ModerationController
  before_action :load_fursuit_request, only: [
    :show,
    :update,
    :dismiss,
    :reopen,
    :mark_as_accepted,
    :assign,
    :unassign
  ]
  before_action :ensure_fursuit_requests_capability!

  def index
    @fursuit_requests = FursuitRequest
      .order(updated_at: :desc)
      .where(status: "new")

    if params[:assigned_to_me] == 'true'
      @fursuit_requests = @fursuit_requests.where(assignee: current_moderator)
    end
  end

  def show
  end

  def update
    @fursuit_request.assign_attributes(params.require(:fursuit_request).permit([
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
      species_ids: [],
      maker_ids: []
    ]))

    #    authorize fursuit_request
    @fursuit_request.save!
    flash[:notice] = "Fursuit updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_fursuit_request_path(@fursuit_request)
  end

  def dismiss
    @fursuit_request.update(status: "dismissed")
    redirect_back fallback_location: moderation_fursuit_request_path(@fursuit_request)
    @fursuit_request.create_activity :rejected, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: @fursuit_request.user
  end

  def mark_as_accepted
    tmpAttr = @fursuit_request.attributes.slice(
      "name",
      "is_hybrid",
      "fursuit_style_id",
      "fursuit_padding_id",
      "fursuit_finger_id",
      "fursuit_build_id",
      "fursuit_gender_id",
      "base_color",
      "eyes_color",
      "fursuit_leg_type_id",
      "creation_year",
      "species_ids",
      "maker_ids"
    )
    fursuit = Fursuit.new
    fursuit.assign_attributes(tmpAttr)
    begin
      fursuit.avatar = File.open("app/assets/images/species/#{fursuit.is_hybrid ? "Hybrid" : fursuit.species[0]}.png")
    rescue
      fursuit.avatar = File.open("app/assets/images/species/FAILED.png")
    end
    fursuit.save!
    @fursuit_request.update(status: "accepted")
    @fursuit_request.create_activity :accepted, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: @fursuit_request.user
    redirect_back fallback_location: moderation_fursuit_requests_path
  end

  def reopen
    @fursuit_request.update(status: 'new')

    redirect_back fallback_location: moderation_fursuit_request_path(@fursuit_request)
  end

  def assign
    @fursuit_request.update(assignee: current_moderator)

    redirect_back fallback_location: moderation_fursuit_request_path(@fursuit_request)
  end

  def unassign
    @fursuit_request.update(assignee: nil)

    redirect_back fallback_location: moderation_fursuit_request_path(@fursuit_request)
  end

  protected

  def ensure_fursuit_requests_capability!
    ensure_capability! "assets"
  end

  def load_fursuit_request
    @fursuit_request = FursuitRequest.find(params[:id] || params[:fursuit_request_id])
  end
end
