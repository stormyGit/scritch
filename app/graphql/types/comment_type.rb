module Types
  class CommentType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :body, ID, null: false
    field :user, UserType, null: false
    field :medium, MediumType, null: false
    field :created_at, String, null: false
  end
end
