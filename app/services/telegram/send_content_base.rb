module Telegram
  class SendContentBase

    attr_accessor :chat_id, :content, :options, :response

    def initialize(chat_id, content, **options)
      @chat_id = chat_id
      @content = content
      @options = options
    end

    def call
      return false unless valid?

      @response = send_content
      @response.present?
    end

    private

    def telegram_options
      [default_options, options, service_options].inject(&:merge)
    end

    def default_options
      { chat_id: chat_id }
    end

    def valid?
      content.present?
    end

    def service_options
      {}
    end

    def send_content
      raise NotImplementedError, 'You should implement this method in child class'
    end

  end
end
