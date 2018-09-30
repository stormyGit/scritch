module Types
  class LikeType < Types::BaseObject
    description "Like object"
    field :id, ID, null: false
    field :user, UserType, null: false
    field :medium, MediumType, null: false
  end
end
