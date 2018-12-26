class Moderation::EditionsController < ApplicationController
  include ModerationHelper
  before_action :check_if_moderator!


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
    @edition = Edition.find(params[:id])
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
      :year
    ]))
    #    authorize edition
    edition.year = edition.start_date.year
    edition.save!
    flash[:notice] = "Edition updated!"
    flash[:class] = "has-text-warning"
    redirect_to moderation_event_editions_path(event_id: params[:event_id])
  end

  def edit
    @edition = Edition.find(params[:id])
    @event = Event.find(params[:event_id])

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
      :year
    ]))
    #    authorize edition
    edition.year = edition.start_date.year
    edition.save!
    flash[:notice] = "Edition added!"
    flash[:class] = "has-text-primary"
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
end
