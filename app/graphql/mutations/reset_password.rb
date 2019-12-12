class Mutations::ResetPassword < Mutations::BaseMutation
  argument :email, String, required: true

  field :errors, [String], null: false

  def resolve(params)
    begin
      user = User.find_by(email: params[:email], service: "email")
      user.send_reset_password_instructions
    rescue => error
      return GraphQL::ExecutionError.new("unknown_email")
    end
  end
end
