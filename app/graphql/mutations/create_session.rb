class Mutations::CreateSession < Mutations::BaseMutation
  argument :telegram_id, Integer, required: true
  argument :telegram_first_name, String, required: true
  argument :telegram_last_name, String, required: false
  argument :telegram_username, String, required: false
  argument :telegram_photo_url, String, required: false
  argument :telegram_auth_date, Integer, required: true
  argument :telegram_hash, String, required: true

  field :session, Types::SessionType, null: true
  field :errors, [String], null: false

  def resolve(params)
    telegram_hash = params.delete :telegram_hash
    check_string = params.map { |k, v| "#{k.to_s.gsub(/^telegram_/, '')}=#{v}" }.sort.join("\n")
    if OpenSSL::HMAC.hexdigest("SHA256", Digest::SHA256.digest(Telegram.bot.token), check_string) != telegram_hash
      ExceptionNotifier.notify_exception Exception.new("Telegram hash mismatch: #{telegram_hash}: #{params.to_json}")
      raise Pundit::NotAuthorizedError
    end

    user = User.find_or_create_by(telegram_id: params[:telegram_id]) do |user|
      user.telegram_id = params[:telegram_id]

      if params[:telegram_last_name].present?
        user.name = "#{params[:telegram_first_name]} #{params[:telegram_last_name]}"
      else
        user.name = params[:telegram_first_name]
      end

      begin
        profile_photos = Telegram.bot.get_user_profile_photos(user_id: params[:telegram_id], limit: 1)
        return if profile_photos["result"]["total_count"] == 0

        profile_photo_file = profile_photos["result"]["photos"][0].sort_by do |profile_photo|
          profile_photo["width"]
        end.last
        if profile_photo_file.present?
          profile_photo_file_path = Telegram.bot.get_file(file_id: profile_photo_file['file_id'])["result"]["file_path"]

          user.remote_avatar_url = "https://api.telegram.org/file/bot#{Telegram.bot.token}/#{profile_photo_file_path}"
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
