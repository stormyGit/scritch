class Telegram::SendMessageService < Telegram::SendContentBase

  private

  def send_content
    Telegram.bots[:admin].send_message(telegram_options)
  end

  def service_options
    { text: content }
  end

end
