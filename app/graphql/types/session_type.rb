module Types
  class SessionType < Types::BaseObject
    description "Session object"
    field :id, ID, null: false
    field :user, UserType, null: false
  end
end
