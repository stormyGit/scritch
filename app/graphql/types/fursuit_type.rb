module Types
  class FursuitType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :slug, String, null: false
    field :creation_year, Integer, null: true
    field :media_count, Integer, null: true
    field :followers_count, Integer, null: true
    field :likes_count, Integer, null: true
    field :faves_count, Integer, null: true
    field :claimed, Boolean, null: false
    field :possessed, Boolean, null: false
    field :avatar, String, null: true
    field :followed, Boolean, null: false
    field :is_hybrid, Boolean, null: false
    field :media, [MediumType], null: true
    field :makers, [MakerType], null: true
    field :users, [UserType], null: true
    field :fursuit_style, FursuitStyleType, null: true
    field :fursuit_leg_type, FursuitLegTypeType, null: true
    field :fursuit_build, FursuitBuildType, null: true
    field :fursuit_padding, FursuitPaddingType, null: true
    field :fursuit_finger, FursuitFingerType, null: true
    field :base_color, String, null: true
    field :eyes_color, String, null: true
    field :hybrid_species, [FursuitSpecyType], null: true
    field :fursuit_specy, FursuitSpecyType, null: true

    def claimed
      Claim.where(user: context[:current_user], fursuit: object).count > 0
    end

    def possessed
      FursuitUser.where(user: context[:current_user], fursuit: object).count > 0
    end

    def followed
      FursuitSubscription.where(user: context[:current_user], fursuit: object).count > 0
    end

    def media_count
      object.media.count
    end

    def followers_count
      object.fursuit_subscriptions.count
    end

    def likes_count
      Like.where(medium: object.media).count
    end

    def faves_count
      Fave.where(medium: object.media).count
    end

    def avatar
      object.avatar_url(:thumbnail)
    end

    def media
      object.media.order(created_at: :desc)
    end

    def hybrid_species
      if !object.is_hybrid || !object.hybrid
        return []
      end
      object.hybrid.fursuit_species.order(:name)
    end
  end
end
