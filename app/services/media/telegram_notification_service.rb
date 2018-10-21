module Media
  class TelegramNotificationService

    attr_reader :medium

    def initialize(medium)
      @medium = medium
    end

    def call
      return unless Rails.env.production?
      
      telegram_send_message_service.call
    end

    private

    def telegram_send_message_service
      @telegram_send_message_service ||= Telegram::SendMessageService.new(
        ENV["MODS_CHAT_ID"],
        notification_text,
        reply_markup: reply_markup
      )
    end

    def notification_text
      %(
          [New video from #{medium.user.name}]:

          #{medium.title}
          #{medium.description}
      )
    end

    def reply_markup
      {
        inline_keyboard: [
          [
            {
              text: 'View on Murrtube',
              url: Rails.application.routes.url_helpers.admin_medium_url(medium)
            }
          ]
        ]
      }
    end
  end
end
