class Mutations::RegisterUser < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true
  argument :name, String, required: true

  field :errors, [String], null: false

  def resolve(params)
    begin
      user = User.create!(email: params[:email], password: params[:password], name: params[:name], telegram_id: params[:email], service: "email")
      user.send_confirmation_instructions
    rescue => error
      return GraphQL::ExecutionError.new("email_exists")
    end
  end
end
