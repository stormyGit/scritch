module Types
  class CommentType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :parent_id, ID, null: true
    field :body, String, null: false
    field :user, UserType, null: false
    field :medium, MediumType, null: false
    field :created_at, String, null: false
    field :replies, [CommentType], null: false
    field :replies_count, Integer, null: false

    def created_at
      object.created_at.iso8601
    end

    def replies_count
      object.replies_count
    end
  end
end
