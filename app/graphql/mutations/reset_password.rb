class Mutations::ResetPassword < Mutations::BaseMutation
  argument :email, String, required: true
  argument :captcha, String, required: true

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
      user = User.find_by(email: params[:email], service: "email")
      user.send_reset_password_instructions
    rescue => error
      return GraphQL::ExecutionError.new("unknown_email")
    end

    return { errors: [] }
  end
end
