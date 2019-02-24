module Types
  class FursuitType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :slug, String, null: false
    field :creation_year, Integer, null: true
    field :media_count, Integer, null: true
    field :is_hybrid, Boolean, null: false
    field :media, [MediumType], null: true
    field :makers, [MakerType], null: true
    field :users, [UserType], null: true
    field :fursuit_style, FursuitStyleType, null: true
    field :fursuit_leg_type, FursuitLegTypeType, null: true
    field :hybrid_species, [FursuitSpecyType], null: true
    field :fursuit_specy, FursuitSpecyType, null: true

    def media_count
      Medium.where(fursuit_id: object.id).distinct.count
    end

    def media
      object.media.order(created_at: :desc)
    end

    def hybrid_species
      if !object.is_hybrid
        return []
      end
      object.hybrid.fursuit_species.order(:name)
    end
  end
end
