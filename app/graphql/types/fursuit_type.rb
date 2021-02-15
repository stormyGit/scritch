module Types
  class FursuitType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :visible, Boolean, null: false
    field :bio, String, null: true
    field :slug, String, null: false
    field :creation_year, Integer, null: true
    field :media_count, Integer, null: true
    field :followers_count, Integer, null: true
    field :likes_count, Integer, null: true
    field :faves_count, Integer, null: true
    field :claimed, Boolean, null: false
    field :claim_rejected, Boolean, null: false
    field :possessed, Boolean, null: false
    field :avatar, String, null: true
    field :followed, Boolean, null: false
    field :is_hybrid, Boolean, null: false
    field :media, [MediumType], null: true
    has_many_field :makers, [Types::MakerType], null: false
    field :users, [UserType], null: true
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
      object.makers.where(visible: true)
    end

    def claimed
      Claim.where(user: context[:current_user], fursuit: object, status: "open").count > 0
    end

    def claim_rejected
      Claim.where(user: context[:current_user], fursuit: object, status: "rejected").count > 0
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

  end
end
