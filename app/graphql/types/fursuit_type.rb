module Types
  class FursuitType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :slug, String, null: false
    field :creation_year, Integer, null: true
    field :media_count, Integer, null: true
    field :makers, [MakerType], null: true
    field :users, [UserType], null: true
    field :fursuit_style, FursuitStyleType, null: true
    field :fursuit_leg_type, FursuitLegTypeType, null: true
    field :fursuit_specy, FursuitSpecyType, null: true

    def media_count
      Medium.where(fursuit_id: object.id).distinct.count
    end
  end
end
