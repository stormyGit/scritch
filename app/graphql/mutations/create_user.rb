class Mutations::CreateUser < Mutations::BaseMutation
  null true

  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  def resolve(email:, password:, password_confirmation:)
    user = User.new({
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })

    if user.save
      {
        user: user,
        errors: [],
      }
    else
      {
        user: nil,
        errors: user.errors.full_messages
      }
    end
  end
end
