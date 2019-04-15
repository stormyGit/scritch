module Claims
  class TelegramNotificationService

    attr_reader :claim

    def initialize(claim)
      @claim = claim
    end

    def call
      # return unless Rails.env.production?

      telegram_send_message_service.call
    end

    private

    def telegram_send_message_service
      @telegram_send_message_service ||= Telegram::SendMessageService.new(
        ENV["TELEGRAM_CLAIM_GROUP_ID"],
        notification_text,
        reply_markup: reply_markup
      )
    end

    def notification_text
      %(
          User [#{claim.user.name}]#{claim.user.telegram_username.present? ? "(@#{claim.user.telegram_username})" : ""} has claimed this fursuit:

          * #{claim.fursuit.name}

          * Species: #{claim.fursuit.is_hybrid ? "Hybrid" : claim.fursuit.species.first.name}
          * Maker: #{claim.fursuit.makers[0] ? claim.fursuit.makers[0].name : "Unknown"}
      )
    end

    def reply_markup
      if claim.conflictual
        {
          inline_keyboard: [
            [
              {
                text: 'Investigate',
                url: moderation_claims_url
              }
            ]
          ]
        }
      else
        {
          inline_keyboard: [
            [
              {
                text: 'Approve',
                callback_data: "APPROVE_CLAIM #{claim.uuid}"
              },
              {
                text: 'Reject',
                callback_data: "REJECT_CLAIM #{claim.uuid}"
              },
              {
                text: 'Investigate',
                url: moderation_claims_url
              }
            ]
          ]
        }
      end
    end

    def moderation_claims_url
      Rails.application.routes.url_helpers.moderation_claims_url(host: "scritch.es", protocol: "https")
    end
  end
end
