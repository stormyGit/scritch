class Mutations::CreateFollow < Mutations::BaseMutation
  argument :followable_id, ID, required: true

  field :follow, Types::FollowType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    follow = Follow.new({
      follower: context[:current_user],
      followable_id: arguments[:followable_id],
      followable_type: "User"
    })

    raise Pundit::NotAuthorizedError unless FollowPolicy.new(context[:current_user], follow).create?

    if follow.save
      {
        follow: follow,
        errors: [],
      }
    else
      {
        follow: nil,
        errors: follow.errors.full_messages
      }
    end
  end
end
