class Mutations::CreateSession < Mutations::BaseMutation
  argument :telegram_id, Integer, required: true
  argument :telegram_first_name, String, required: true
  argument :telegram_auth_date, Integer, required: true
  argument :telegram_hash, String, required: true

  field :session, Types::SessionType, null: true
  field :errors, [String], null: false

  def resolve(telegram_id:, telegram_first_name:, telegram_auth_date:, telegram_hash:)
    user = User.find_or_create_by(telegram_id: telegram_id) do |user|
      user.telegram_id = telegram_id
      user.name = telegram_first_name

      begin
        profile_photos = Telegram.bot.get_user_profile_photos(user_id: telegram_id, limit: 1)
        return if profile_photos["result"]["total_count"] == 0

        profile_photo_file = profile_photos["result"]["photos"][0].sort_by do |profile_photo|
          profile_photo["width"]
        end.last
        if profile_photo_file.present?
          profile_photo_file_path = Telegram.bot.get_file(file_id: profile_photo_file['file_id'])["result"]["file_path"]

          user.avatar.attach(io: open("https://api.telegram.org/file/bot#{Telegram.bot.token}/#{profile_photo_file_path}"), filename: "avatar")
        end

      rescue => error
        ExceptionNotifier.notify_exception(error)
      end
    end

    session = Session.new(user: user)
    if session.save
      {
        session: session,
        errors: [],
      }
    else
      {
        session: nil,
        errors: session.errors.full_messages
      }
    end
  end
end
