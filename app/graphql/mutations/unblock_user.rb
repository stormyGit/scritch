class Mutations::UnblockUser < Mutations::BaseMutation
  argument :user_id, ID, required: true

  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    user = User.find(arguments[:user_id])
    context[:current_user].blocked_users_ids = (context[:current_user].blocked_users_ids - [user.uuid]).uniq

    if context[:current_user].save
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
