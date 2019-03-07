module Types
  class FursuitSubscriptionType < Types::BaseObject
    description "FursuitSubscription object"
    field :id, ID, null: false
    field :fursuit, FursuitType, null: false
    field :user, UserType, null: false
  end
end
