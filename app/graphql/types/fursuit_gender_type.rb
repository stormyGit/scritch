module Types
  class FursuitGenderType < Types::BaseObject
    description "Fursuit Gender object"
    field :id, ID, null: false
    field :name, String, null: false
  end
end
