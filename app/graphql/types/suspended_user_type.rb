module Types
  class SuspendedUserType < Types::BaseObject
    description "SuspendedUser object"
    field :id, ID, null: false
    field :limit, Integer, null: false
    field :created_at, String, null: false

    def created_at
      object.created_at.iso8601
    end
  end
end
