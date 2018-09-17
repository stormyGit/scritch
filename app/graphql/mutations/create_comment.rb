class Mutations::CreateComment < Mutations::BaseMutation
  argument :body, String, required: true
  argument :medium_id, ID, required: true

  field :comment, Types::CommentType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    comment = Comment.new({
      body: arguments[:body],
      medium_id: arguments[:medium_id],
      user_id: User.first.id
    })

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
