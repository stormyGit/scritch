module Types
  class FursuitRequestType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :visible, Boolean, null: false
    field :notes, String, null: true
    field :url, String, null: true
    field :slug, String, null: false
    field :creation_year, Integer, null: true
    field :is_hybrid, Boolean, null: false
    field :makers, [MakerType], null: true
    field :user, UserType, null: true
    field :assignee, ModeratorType, null: true
    field :fursuit_style, FursuitStyleType, null: true
    field :fursuit_leg_type, FursuitLegTypeType, null: true
    field :fursuit_build, FursuitBuildType, null: true
    field :fursuit_padding, FursuitPaddingType, null: true
    field :fursuit_finger, FursuitFingerType, null: true
    field :base_color, String, null: true
    field :eyes_color, String, null: true
    field :species, [SpecyType], null: false
    field :fursuit_gender, FursuitGenderType, null: true

    def makers
      Maker.where(uuid: object.maker_ids)
    end

    def species
      Specy.where(id: object.species_ids)
    end
  end
end
