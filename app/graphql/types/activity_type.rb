module Types
  class ActivityType < Types::BaseObject
    description "Activity object"
    field :id, ID, null: false
    field :key, String, null: false
    field :owner, UserType, null: false
    field :trackable, ActivityTrackableType, null: false
    field :created_at, String, null: false

    def created_at
      object.created_at.iso8601
    end
  end
end
