module Types
  class FursuitRequestType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false

  end
end
