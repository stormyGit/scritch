module Types
  class CommentType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :body, String, null: false
    field :user, UserType, null: false
    field :medium, MediumType, null: false
    field :created_at, String, null: false
    field :replies, [CommentType], null: false
    field :replies_count, Integer, null: false
  end

  def created_at
    object.created_at.iso8601
  end
end
