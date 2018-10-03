class Mutations::DeleteComment < Mutations::BaseMutation
  argument :id, ID, required: true

  field :comment, Types::CommentType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    comment = Comment.find(arguments[:id])

    raise Pundit::NotAuthorizedError unless CommentPolicy.new(context[:current_user], comment).destroy?

    if comment.destroy
      {
        comment: comment,
        errors: [],
      }
    else
      {
        comment: comment,
        errors: comment.errors.full_messages
      }
    end
  end
end
