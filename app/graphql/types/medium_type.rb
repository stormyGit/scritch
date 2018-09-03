module Types
  class MediumType < Types::BaseObject
    description "Medium object"
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: true
  end
end
