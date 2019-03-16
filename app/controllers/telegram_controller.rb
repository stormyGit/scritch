class TelegramController < Telegram::Bot::UpdatesController
  def start!(data = nil, *)
    begin
      user = User.find_or_create_by(telegram_id: self.payload["from"]["id"]) do |user|
        if self.payload["from"]["last_name"].present?
          user.name = "#{self.payload["from"]["first_name"]} #{self.payload["from"]["last_name"]}"
        else
          user.name = self.payload["from"]["first_name"]
        end
        save_profile_photo!(user)
      end

      session = ::Session.create!(user: user)
      reply_with :message, text: "Please use the following code to login: #{session.uuid.upcase}"
    rescue => error
      unless error.kind_of?(Telegram::Bot::Forbidden)
        ExceptionNotifier.notify_exception(error)

        reply_with :message, text: "An unexpected error has occurred. Please retry."
      end
    end
  end

  def save_profile_photo!(user)
    profile_photos = self.bot.get_user_profile_photos(user_id: user.telegram_id, limit: 1)
    return if profile_photos["result"]["total_count"] == 0

    profile_photo_file = profile_photos["result"]["photos"][0].sort_by do |profile_photo|
      profile_photo["width"]
    end.last
    if profile_photo_file.present?
      profile_photo_file_path = self.bot.get_file(file_id: profile_photo_file['file_id'])["result"]["file_path"]
      user.remote_avatar_url = "https://api.telegram.org/file/bot#{self.bot.token}/#{profile_photo_file_path}"
    end


  rescue => error
    ExceptionNotifier.notify_exception(error)
  end

  def callback_query(query)
    action, id     = query.split(" ")
    message_id     = self.payload["message"]["message_id"]

    case action
    when 'APPROVE_CLAIM'
      claim = Claim.find(id)
      chat_id = ENV["TELEGRAM_CLAIM_GROUP_ID"]
      FursuitUser.create!(user: claim.user, fursuit: claim.fursuit)
      claim.destroy

    when "REJECT_CLAIM"
      claim = Claim.find(id)
      chat_id = ENV["TELEGRAM_CLAIM_GROUP_ID"]
      user = User.find(claim.user.uuid)
      user.update!(score: user.score - 10)
      claim.destroy
    end

  rescue => error
    ExceptionNotifier.notify_exception(error)
  ensure
    Telegram.bots[:admin].delete_message({
      chat_id: chat_id,
      message_id: message_id
    })
  end
end
