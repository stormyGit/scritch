class Mutations::DeleteFollow < Mutations::BaseMutation
  argument :followable_id, ID, required: true

  field :follow, Types::FollowType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    follow = Follow.find_by({
      follower: context[:current_user],
      followable_id: arguments[:followable_id],
      followable_type: "User"
    })

    raise Pundit::NotAuthorizedError unless FollowPolicy.new(context[:current_user], follow).destroy?

    if follow.destroy
      {
        follow: follow,
        errors: [],
      }
    else
      {
        follow: follow,
        errors: follow.errors.full_messages
      }
    end
  end
end
