class Mutations::DeleteUser < Mutations::BaseMutation
  argument :id, ID, required: true

  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    user = User.find(arguments[:id])

    if user.destroy
      {
        user: user,
        errors: [],
      }
    else
      {
        user: user,
        errors: user.errors.full_messages
      }
    end
  end
end
