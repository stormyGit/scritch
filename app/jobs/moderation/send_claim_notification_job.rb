module Moderation
  class SendClaimNotificationJob < ApplicationJob
    queue_as :default

    def perform(claim)
      Claims::TelegramNotificationService.new(claim).call
    end
  end
end
