class MediaController < ApplicationController
  def index
    render "application/index"
  end

  def react_moderation
    if Moderator.where.not(telegram_id: nil).where(telegram_id: Session.find_by(uuid: cookies.signed[:token]).user&.telegram_id).count > 0
      render "application/index"
    else
      render "errors/403", status: 403
    end
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
