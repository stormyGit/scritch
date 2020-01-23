module Types
  class ClaimType < Types::BaseObject
    description "Claim object"
    field :id, ID, null: false
    field :fursuit, FursuitType, null: false
    field :user, UserType, null: false
    field :conflictual, Boolean, null: false
    field :status, String, null: false

  end
end
