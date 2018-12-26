class Moderation::EventsController < ApplicationController
  include ModerationHelper
  before_action :check_if_moderator!

  def index
    @events = Event.all.order(:name)

    if params[:name].present?
        @events = @events.where(name: params[:name])
    end

    @events = @events.page(params[:page]).per(30)
  end

  def show
    @event = Event.find_by(id: params[:id])
  end

  def edit
    @event = Event.find_by(id: params[:id])
  end

  def update
    @event = Event.find_by(id: params[:id])
    @event.assign_attributes(params.require(:event).permit([
     :name
    ]))
    #    authorize event
    if params[:event][:event_picture].present?
      @event.event_picture.attach(params[:event][:event_picture].first)
    end
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
    event.event_picture.attach(params[:event][:event_picture].first)
    event.save!
    flash[:notice] = "Event added!"
    flash[:class] = "has-text-primary"
    redirect_to moderation_events_path
  end

  def destroy
    event = Event.find_by(id: params[:id])
    event.destroy!

    flash[:notice] = "Event removed!"
    flash[:class] = "has-text-danger"
    redirect_to moderation_events_path
  end
end
