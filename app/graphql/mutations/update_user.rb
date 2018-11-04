class Mutations::UpdateUser < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :theme, String, required: false
  argument :name, String, required: false
  argument :slug, String, required: false
  argument :bio, String, required: false
  argument :website, String, required: false
  argument :banner, String, required: false
  argument :avatar, String, required: false
  argument :public, Boolean, required: false
  argument :chat_enabled, Boolean, required: false

  argument :remove_banner, Boolean, required: false
  argument :remove_avatar, Boolean, required: false

  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    user = User.find(arguments[:id])
    user.assign_attributes(arguments)

    raise Pundit::NotAuthorizedError unless UserPolicy.new(context[:current_user], user).update?

    if arguments[:remove_avatar]
      user.remove_avatar!
    end

    if arguments[:remove_banner]
      user.remove_banner!
    end

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
