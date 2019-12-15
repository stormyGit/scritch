class Mutations::EmailSignIn < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true
  argument :captcha, String, required: true

  field :session, Types::SessionType, null: true
  field :errors, [String], null: false

  def resolve(params)
    response = RestClient::Request.execute(
      method: :post,
      url: "https://www.google.com/recaptcha/api/siteverify?secret=#{ENV["CAPTCHA_SECRET_KEY"]}&response=#{params[:captcha]}",
    )
    if response["success"] == false
      return GraphQL::ExecutionError.new("captcha_failed")
    end
    begin
      user = User.find_for_database_authentication(email: params[:email], service: "email")
    rescue => error
      return GraphQL::ExecutionError.new('unknown_email')
    end
    if user.blank?
      return GraphQL::ExecutionError.new('unknown_email')
    end
    if !user.valid_password?(params[:password])
      return GraphQL::ExecutionError.new('wrong_pwd')
    end
    if user.confirmed_at.blank?
      return GraphQL::ExecutionError.new('no_confirm')
    end

    session = Session.new(user: user)

    if session.save
      context[:cookies].signed[:token] = {value: session.uuid, httponly: true, expires: Time.now + 1.month, same_site: :strict}
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
