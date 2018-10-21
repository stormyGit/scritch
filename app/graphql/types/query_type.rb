module Types
  class QueryType < Types::BaseObject
    field :medium, MediumType, null: false do
      description "Find a medium by ID"
      argument :id, ID, required: true
    end

    field :media, [MediumType], null: false do
      description "List media"
      argument :q, String, required: false
      argument :sort, String, required: false
      argument :user_id, ID, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :activities, [ActivityType], null: false do
      description "Activities"
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :likes_by_user, [LikeType], null: false do
      description "List likes by user"
      argument :user_id, ID, required: true
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :followers_by_user, [UserType], null: false do
      description "List followers by user"
      argument :user_id, ID, required: true
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :followings_by_user, [UserType], null: false do
      description "List followings by user"
      argument :user_id, ID, required: true
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :comments_by_medium, [CommentType], null: false do
      description "List comments by medium"
      argument :medium_id, ID, required: true
      argument :parent_id, ID, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :user, UserType, null: false do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    field :session, SessionType, null: true do
      description "Find current session"
    end

    field :unread_activity_count, Integer, null: false do
      description "Get the number of unread activities"
    end

    def medium(arguments = {})
      medium = Medium.includes(comments: [:user]).find(arguments[:id])
      raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).show?

      View.add(arguments[:id], context[:current_user_references])

      medium
    end

    def media(arguments = {})
      media = MediumPolicy::Scope.new(context[:current_user], Medium.all).resolve.includes(:user)

      if arguments[:q].present?
        media = media
          .joins(:user)
          .where("users.name % ? OR media.title @@ ? OR media.uuid IN (?)", arguments[:q], arguments[:q], Medium.tagged_with(arguments[:q]).select(:uuid))
      end

      media =
        case arguments[:sort]
        when 'latest'
          media.order("media.published_at DESC, media.created_at DESC")
        when 'trending'
          media.order(["media.likes_count", created_at: :desc])
        when 'subscriptions'
          media.where(user: context[:current_user].all_following).order("media.published_at DESC, media.created_at DESC")
        else
          media
        end

      if arguments[:user_id].present?
        media = media.where(user_id: arguments[:user_id])
      end

      media.includes(:taggings).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def activities(arguments = {})
      Activity
        .where(recipient: context[:current_user])
        .where.not(owner: context[:current_user])
        .order(created_at: :desc)
        .offset(arguments[:offset]).limit(arguments[:limit])
        .includes(:owner, :recipient, :trackable)
    end

    def likes_by_user(arguments = {})
      LikePolicy::Scope.new(context[:current_user], Like.where(user_id: arguments[:user_id])).resolve.order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def followers_by_user(arguments = {})
      User.where(uuid: FollowPolicy::Scope.new(context[:current_user], Follow.where(followable_id: User.find(arguments[:user_id]))).resolve.pluck(:follower_id))
    end

    def followings_by_user(arguments = {})
      User.where(uuid: FollowPolicy::Scope.new(context[:current_user], Follow.where(follower_id: User.find(arguments[:user_id]))).resolve.pluck(:followable_id))
    end

    def comments_by_medium(arguments = {})
      Comment
        .where(medium_id: arguments[:medium_id], parent_id: arguments[:parent_id])
        .order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def user(arguments = {})
      User.find(arguments[:id])
    end

    def session(arguments = {})
      context[:current_session]
    end

    def unread_activity_count
      Activity
        .where(recipient: context[:current_user])
        .where.not(owner: context[:current_user])
        .where("activities.created_at > ?", context[:current_user].last_activities_read)
        .count
    end
  end
end
