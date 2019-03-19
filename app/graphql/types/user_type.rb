module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :slug, ID, null: false
    field :public, Boolean, null: false
    field :chat_enabled, Boolean, null: false
    field :name, String, null: false
    field :published_media, [MediumType], null: false
    field :fursuits, [FursuitType], null: false
    field :sponsor, SponsorType, null: true
    field :avatar, String, null: true
    field :banner, String, null: true
    field :bio, String, null: true
    field :website, String, null: true
    field :theme, String, null: false
    field :tag_tutorial, Boolean, null: false

    field :followed, Boolean, null: false
    field :following, Boolean, null: false

    field :show_ads, Boolean, null: false
    field :show_tooltips, Boolean, null: false

    field :global_score, Integer, null: false

    field :media_count, Integer, null: false
    field :followers_count, Integer, null: false
    field :following_count, Integer, null: false
    field :fursuits_count, Integer, null: false
    field :likes_count, Integer, null: false

    field :liked_count, Integer, null: false
    field :faved_count, Integer, null: false
    field :tagged_count, Integer, null: false

    field :blocked, Boolean, null: false
    field :has_adverts, Boolean, null: false

    field :unread_announcements_count, Integer, null: false

    def has_adverts
      object.advert.present?
    end

    def fursuits
      object.fursuits
    end

    def sponsor
      if object.sponsor.blank? || object.sponsor.status == "pending"
        nil
      else
        object.sponsor
      end
    end

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
      MediumPolicy::Scope.new(context[:current_user], object.media).resolve.count
    end

    def followers_count
      FollowPolicy::Scope.new(context[:current_user], Follow.where(followable_id: object)).resolve.count
    end

    def following_count
      FollowPolicy::Scope.new(context[:current_user], Follow.where(follower_id: object)).resolve.count
    end

    def fursuits_count
      FursuitPolicy::Scope.new(context[:current_user], FursuitUser.where(user: object)).resolve.count
    end

    def likes_count
      LikePolicy::Scope.new(context[:current_user], object.likes).resolve.count
    end

    def faves_count
      FavePolicy::Scope.new(context[:current_user], object.faves).resolve.count
    end

    def liked_count
      Like.where(medium: Medium.where(user: object)).distinct.count
    end

    def faved_count #TODO
      Fave.where(medium: Medium.where(user: object)).distinct.count
    end

    def tagged_count
      FursuitMedium.where(fursuit: object.fursuits).distinct.count
    end

    def blocked
      if context[:current_user].present?
        context[:current_user].blocked_users_ids.include?(object.uuid)
      else
        false
      end
    end

    def unread_announcements_count
      raise Pundit::NotAuthorizedError unless UserPolicy.new(context[:current_user], object).has_unread_announcements?

      Announcement.where("announcements.created_at > ?", object.last_announcements_read).count
    end
  end
end
