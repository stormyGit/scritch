class Mutations::CreateFacebookSession < Mutations::BaseMutation
  argument :service, String, required: true
  argument :facebook_id, String, required: true
  argument :facebook_email, String, required: false
  argument :facebook_name, String, required: true
  argument :facebook_token, String, required: true
  argument :facebook_signed_request, String, required: true
  argument :facebook_photo_url, String, required: true

  field :session, Types::SessionType, null: true
  field :errors, [String], null: false

  def resolve(params)
    # telegram_hash = params.delete :telegram_hash
    # check_string = params.map { |k, v| "#{k.to_s.gsub(/^telegram_/, '')}=#{v}" }.sort.join("\n")
    # if OpenSSL::HMAC.hexdigest("SHA256", Digest::SHA256.digest(Telegram.bots[:login].token), check_string) != telegram_hash
    #   ExceptionNotifier.notify_exception Exception.new("Telegram hash mismatch: #{telegram_hash}: #{params.to_json}")
    #   raise Pundit::NotAuthorizedError
    # end

    user = User.find_or_create_by(facebook_id: params[:facebook_id]) do |user|
      user.service = params[:service]
      user.telegram_id = params[:facebook_id]
      user.facebook_id = params[:facebook_id]
      user.facebook_email = params[:facebook_email] || ""
      user.name = params[:facebook_name]
      begin
        user.remote_avatar_url = params[:facebook_photo_url]
      rescue => error
        ExceptionNotifier.notify_exception(error)
      end
    end

    session = Session.new(user: user)

    if session.save
      context[:cookies].signed[:token] = {value: session.uuid, httponly: true, expires: Time.now + 1.month}
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