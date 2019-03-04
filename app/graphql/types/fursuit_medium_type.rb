module Types
  class FursuitMediumType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :medium, MediumType, null: false
    field :fursuit, FursuitType, null: false

  end
end
