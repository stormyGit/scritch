class EventsController < ApplicationController
  def index
    render "application/index"
  end
  def show
    uuid = params[:id].match(/[\w]{8}(-[\w]{4}){3}-[\w]{12}$/)
    if uuid.blank?
      return head(404)
    end

    event = Event.find(uuid[0])

    @meta[:title] = event.name

    render "application/index"
  end
end
