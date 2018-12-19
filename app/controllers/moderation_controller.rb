class ModerationController < ApplicationController
  include ModerationHelper

  before_action :authenticate_moderator!
  puts "\n\n\n\n\n\n\nJE SUIS LA\n\n\n\n\n"
  layout 'layouts/moderation'

  def ensure_capability!(capability)
    unless current_moderator.capabilities.include?(capability)
      redirect_to moderation_root_path
      return false
    end
    true
  end
end
