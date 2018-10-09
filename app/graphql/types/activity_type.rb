module Types
  class ActivityType < Types::BaseObject
    description "Activity object"
    field :id, ID, null: false
    field :key, String, null: false
    field :owner, UserType, null: false
  end
end
