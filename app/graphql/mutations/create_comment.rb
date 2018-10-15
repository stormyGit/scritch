class Mutations::CreateComment < Mutations::BaseMutation
  argument :body, String, required: true
  argument :medium_id, ID, required: true
  argument :parent_id, ID, required: false

  field :comment, Types::CommentType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    comment = Comment.new({
      body: arguments[:body],
      medium_id: arguments[:medium_id],
      parent_id: arguments[:parent_id],
      user_id: context[:current_user].id
    })

    raise Pundit::NotAuthorizedError unless CommentPolicy.new(context[:current_user], comment).create?

    if comment.save
      {
        comment: comment,
        errors: [],
      }
    else
      {
        comment: nil,
        errors: comment.errors.full_messages
      }
    end
  end
end
