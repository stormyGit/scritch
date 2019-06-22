class Moderation::AnnouncementsController < ModerationController
  include ModerationHelper
  before_action :ensure_annoucements_capability!

  def index
    @announcements = Announcement.all.order(created_at: :desc).page(params[:page]).per(8)
  end

  def new

  end

  def create
    announcement = Announcement.new
    announcement.assign_attributes(params.require(:announcement).permit([
      :title,
      :body
    ]))

    announcement.save!
    flash[:notice] = "Announcement created!"
    flash[:class] = ""
    redirect_to moderation_announcements_path
  end

  def edit
    @announcement = Announcement.find(params[:id] || params[:announcement_id])
  end

  def update
    announcement = Announcement.find(params[:id] || params[:announcement_id])
    announcement.assign_attributes(params.require(:announcement).permit([
      :title,
      :body
    ]))

    announcement.save!
    flash[:notice] = "Announcement updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_announcements_path
  end

  def destroy
    raise Pundit::NotAuthorizedError unless moderator_can_see?("announcements")
    announcement = Announcement.find(params[:id] || params[:announcement_id])
    announcement.destroy!

    flash[:notice] = "Announcement removed!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_announcements_path
  end

  protected

  def ensure_annoucements_capability!
    ensure_capability! "announcements"
  end
end
