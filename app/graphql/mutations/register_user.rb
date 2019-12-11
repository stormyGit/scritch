class Mutations::RegisterUser < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true
  argument :name, String, required: true

  field :session, Types::SessionType, null: true
  field :errors, [String], null: false

  def resolve(params)
    begin
      user = User.create!(email: params[:email], password: params[:password], name: params[:name], telegram_id: params[:email], service: "email")
      user.send_confirmation_instructions
    rescue => error
      return GraphQL::ExecutionError.new(error)
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
