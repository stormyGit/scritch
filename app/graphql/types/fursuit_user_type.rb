module Types
  class FursuitUserType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :user, UserType, null: false
    field :fursuit, FursuitType, null: false

  end
end
