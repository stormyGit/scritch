class ModerationController < ApplicationController
  include ModerationHelper

  before_action :authenticate_moderator!

  layout 'moderation'

  def ensure_capability!(capability)
    unless current_moderator.capabilities.include?(capability)
      redirect_to moderation_root_path
      return false
    end
    true
  end
end
