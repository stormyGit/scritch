class MediaController < ApplicationController
  def index
    render "application/index"
  end

  def show
    medium = Medium.find(params[:id])

    @meta[:type] = 'video.other'
    @meta[:title] = medium.title
    @meta[:image] = MediumStorage.key_to_cdn_url medium.thumbnail_key
    @meta[:description] = medium.description

    render "application/index"
  end
end
