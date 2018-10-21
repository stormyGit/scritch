module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :slug, ID, null: false
    field :public, Boolean, null: false
    field :name, String, null: false
    field :published_media, [MediumType], null: false
    field :avatar, String, null: true
    field :banner, String, null: true
    field :bio, String, null: true
    field :website, String, null: true
    field :theme, String, null: false

    field :followed, Boolean, null: false
    field :following, Boolean, null: false

    field :media_count, Integer, null: false
    field :followers_count, Integer, null: false
    field :following_count, Integer, null: false
    field :likes_count, Integer, null: false

    def banner
      object.banner_url
    end

    def avatar
      object.avatar_url(:thumbnail)
    end

    def banner
      object.banner_url(:regular)
    end

    def followed
      context[:current_user].present? && context[:current_user].following?(object)
    end

    def following
      context[:current_user].present? && object.following?(context[:current_user])
    end

    def media_count
      MediumPolicy::Scope.new(context[:current_user], object.media.published).resolve.count
    end

    def followers_count
      FollowPolicy::Scope.new(context[:current_user], Follow.where(followable_id: object)).resolve.count
    end

    def following_count
      FollowPolicy::Scope.new(context[:current_user], Follow.where(follower_id: object)).resolve.count
    end

    def likes_count
      LikePolicy::Scope.new(context[:current_user], object.likeds).resolve.count
    end
  end
end
