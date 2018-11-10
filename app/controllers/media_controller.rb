class MediaController < ApplicationController
  def index
    render "application/index"
  end

  def show
    uuid = params[:id].match(/[\w]{8}(-[\w]{4}){3}-[\w]{12}$/)
    if uuid.blank?
      return head(404)
    end

    medium = Medium.find(uuid[0])

    @meta[:type] = 'picture.other'
    @meta[:title] = medium.title
    @meta[:image] = medium.picture_url
    @meta[:description] = medium.description

    render "application/index"
  end
end
