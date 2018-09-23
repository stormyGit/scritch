class Mutations::UpdateUser < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :theme, String, required: false

  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    user = User.find(arguments[:id])
    user.assign_attributes(arguments)

    if user.save
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
