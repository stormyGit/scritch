class Mutations::DeleteLike < Mutations::BaseMutation
  argument :medium_id, ID, required: true

  field :like, Types::LikeType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    like = Like.find_by({
      user: context[:current_user],
      medium: arguments[:medium_id],
    })

    raise Pundit::NotAuthorizedError unless LikePolicy.new(context[:current_user], like).destroy?

    if like.destroy
      {
        like: like,
        errors: [],
      }
    else
      {
        like: like,
        errors: like.errors.full_messages
      }
    end
  end
end
