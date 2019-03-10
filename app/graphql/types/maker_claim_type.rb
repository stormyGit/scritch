module Types
  class MakerClaimType < Types::BaseObject
    description "MakerClaim object"
    field :id, ID, null: false
    field :fursuit, [MakerType], null: false
    field :user, [UserType], null: false
    field :conflictual, Boolean, null: false
    field :status, String, null: false

  end
end
