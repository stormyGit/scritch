module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :slug, ID, null: false
    field :name, String, null: false
    field :published_media, [MediumType], null: false
    field :avatar, String, null: true
    field :banner, String, null: true
    field :bio, String, null: true

    field :followed, Boolean, null: false
    field :following, Boolean, null: false
    field :followers_count, Integer, null: false
    field :following_count, Integer, null: false
    field :likes_count, Integer, null: false

    field :can_update, Boolean, null: false

    def banner
      object.banner_url
    end

    def avatar
      object.avatar_url(:thumbnail)
    end

    def followed
      context[:current_user].present? && context[:current_user].following?(object)
    end

    def following
      context[:current_user].present? && object.following?(context[:current_user])
    end

    def followers_count
      object.followers.count
    end

    def following_count
      object.follows.count
    end

    def likes_count
      0
    end

    def can_update
      UserPolicy.new(context[:current_user], object).update?
    end
  end
end
