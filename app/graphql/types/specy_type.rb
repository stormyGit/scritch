module Types
  class SpecyType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :fursuits, [FursuitType], null: true
  end
end
