module Moderation
  class SendMediumNotificationJob < ApplicationJob
    queue_as :default

    def perform(medium)
      Media::TelegramNotificationService.new(medium).call
    end
  end
end
