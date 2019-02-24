module Types
  class HybridType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :fursuit_species, [FursuitSpecyType], null: false
    field :fursuit, FursuitType, null: false

    def fursuit
      object.fursuit
    end

    def fursuit_species
      object.fursuit_species.order("fursuit_species.name")
    end
  end
end
