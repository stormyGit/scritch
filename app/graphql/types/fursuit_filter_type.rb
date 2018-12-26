module Types
  class FursuitFilterType < Types::BaseObject
    description "Fursuit object"
    field :fursuit_leg_type, [FursuitLegType], null: false
    field :fursuit_specy, [FursuitLegType], null: false
    field :fursuit_style, [FursuitSpecyType], null: false
    field :maker, [MakerType], null: false

    def fursuit_leg_type
      FursuitLegType.all.order(:name)
    end

    def fursuit_specy
      FursuitSpecies.all.order(:name)
    end

    def fursuit_style
      FursuitStyle.all.order(:name)
    end

    def maker
      Maker.all.order(:name)
    end
  end
end
