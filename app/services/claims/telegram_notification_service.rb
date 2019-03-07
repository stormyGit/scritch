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
          [User #{claim.user.name} has claimed this fursuit]:

          #{claim.fursuit.name}
          #{claim.fursuit.is_hybrid ? "Hybrid" : fursuit_specy.name}
      )
    end

    def reply_markup
      if claim.conflictual
        {
          inline_keyboard: [
            [
              {
                text: 'Investigate',
                url: "https://www.google.com" #TODO
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
                url: "https://www.google.com" #TODO
              }
            ]
          ]
        }
      end
    end
  end
end
