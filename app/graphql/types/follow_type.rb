module Types
  class FollowType < Types::BaseObject
    description "Follow object"
    field :id, ID, null: false
    field :follower, UserType, null: false
    field :followable, UserType, null: false
  end
end
