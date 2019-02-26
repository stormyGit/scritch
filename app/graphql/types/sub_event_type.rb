module Types
  class SubEventType < Types::BaseObject
    description "Edition object"
    field :id, ID, null: false
    field :name, String, null: false
    field :edition, EditionType, null: false
  end
end
