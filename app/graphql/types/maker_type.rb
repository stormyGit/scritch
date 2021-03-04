module Types
  class MakerType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :bio, String, null: true
    field :country, String, null: false
    field :region, String, null: true
    field :slug, String, null: false
    field :avatar, String, null: true
    field :web, String, null: true
    field :fursuits, [FursuitType], null: false
    field :fursuits_by_date, [FursuitType], null: false
    field :user, UserType, null: true
    field :commission_status, CommissionStatusType, null: false
    field :visible, Boolean, null: false
    field :claimed, Boolean, null: false
    field :claim_rejected, Boolean, null: false
    field :possessed, Boolean, null: false
    field :fursuits_number, Integer, null: false
    field :followers_count, Integer, null: false
    field :followed, Boolean, null: false

    def claimed
      MakerClaim.where(user: context[:current_user], maker: object, status: "open").count > 0
    end

    def claim_rejected
      MakerClaim.where(user: context[:current_user], maker: object, status: "rejected").count > 0
    end
    def followed
      MakerSubscription.where(user: context[:current_user], maker: object).count > 0
    end

    def possessed
      context[:current_user] && object.user == context[:current_user]
    end

    def avatar
      object.avatar_url(:thumbnail)
    end

    def followers_count
      object.maker_subscriptions.count
    end

    def fursuits_number
      object.fursuits.count || 0
    end

    def fursuits
      object.fursuits.where(visible: true).order(:name)
    end

    def fursuits_by_date
      object.fursuits.where(visible: true).order(creation_year: :desc)
    end

  end
end
