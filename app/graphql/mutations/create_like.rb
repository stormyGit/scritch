class Mutations::CreateLike < Mutations::BaseMutation
  argument :medium_id, ID, required: true

  field :like, Types::LikeType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    like = Like.new({
      user: context[:current_user],
      medium_id: arguments[:medium_id],
    })

    raise Pundit::NotAuthorizedError unless LikePolicy.new(context[:current_user], like).create?

    if like.save
      {
        like: like,
        errors: [],
      }
    else
      {
        like: nil,
        errors: like.errors.full_messages
      }
    end
  end
end
