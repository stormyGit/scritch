class Moderation::EventsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!


  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @events = Event.all.order(:name)

    if params[:name].present?
      @events = @events.where("events.name @@ ? or events.name ilike ?", params[:name], "%#{params[:name]}%")
    end

    @events = @events.page(params[:page]).per(90)
  end

  def show
    @event = Event.find(params[:id])
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    @event.assign_attributes(params.require(:event).permit([
     :name
    ]))
    #    authorize event
    @event.avatar = params[:event][:avatar]
    @event.save!
    flash[:notice] = "Event updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_events_path
  end

  def new

  end

  def create
    event = Event.new
    event.assign_attributes(params.require(:event).permit([
     :name
    ]))
    #    authorize event
    event.avatar = params[:event][:avatar]
    event.save!
    flash[:notice] = "Event added!"
    flash[:class] = ""
    redirect_to moderation_events_path
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy!

    flash[:notice] = "Event removed!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_events_path
  end

  protected

  def ensure_assets_capability!
    ensure_capability! "events"
  end
end
