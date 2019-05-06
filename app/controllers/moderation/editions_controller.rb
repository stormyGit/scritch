class Moderation::EditionsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!

  def index
    @event = Event.find(params[:event_id])
    @editions = Edition.where(event: @event).order(start_date: :desc)

    if params[:year].present?
        @editions = @editions.where(name: params[:year])
    end

    @editions = @editions.page(params[:page]).per(30)
  end

  def show
    @event = Event.find(params[:event_id])
    @edition = Edition.find_by(slug: params[:id], event: @event)

  end

  def update
    edition = Edition.find(params[:id])
    edition.assign_attributes(params.require(:edition).permit([
      :event_id,
      :start_date,
      :end_date,
      :city,
      :country,
      :name,
      :kind,
      :attendance,
      :venue,
      :theme,
      :year
    ]))
    #    authorize edition
    edition.year = edition.start_date.year
    edition.save!
    flash[:notice] = "Edition updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_event_edition_path(event_id: params[:event_id], edition_id: edition.slug)
  end

  def edit
    @event = Event.find(params[:event_id])
    @edition = Edition.find_by(slug: params[:id], event: @event)

  end

  def new
    @event = Event.find(params[:event_id])

  end

  def create
    edition = Edition.new
    edition.assign_attributes(params.require(:edition).permit([
      :event_id,
      :start_date,
      :end_date,
      :city,
      :country,
      :name,
      :kind,
      :attendance,
      :venue,
      :theme,
      :year
    ]))
    #    authorize edition
    edition.year = edition.start_date.year
    edition.save!
    flash[:notice] = "Edition added!"
    flash[:class] = ""
    redirect_to moderation_event_editions_path(event_id: params[:event_id])
  end

  def destroy
    event = params[:event_id]
    edition = Edition.find(params[:id])
    edition.destroy!

    flash[:notice] = "Event removed!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_event_editions_path(event_id: event)
  end

  protected

  def ensure_assets_capability!
    ensure_capability! "events"
  end
end
