module Types
  class QueryType < Types::BaseObject
    include ActiveRecord::Sanitization::ClassMethods

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

    field :users, [UserType], null: false do
      description "Search users"
      argument :q, String, required: false
      argument :fill_with_following, Boolean, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :session, SessionType, null: true do
      description "Find current session"
    end

    field :unread_activity_count, Integer, null: false do
      description "Get the number of unread activities"
    end

    field :unread_chats_count, Integer, null: false do
      description "Get the number of unread chats"
    end

    field :chats, [ChatType], null: false do
      description "List chats"
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :messages, [MessageType], null: false do
      description "List messages"
      argument :chat_id, ID, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :likes, [LikeType], null: false do
      description "List likes"
      argument :medium_id, ID, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :blocked_users, [UserType], null: false do
      description "List blocked users"
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
          media.order(["media.likes_count DESC, media.created_at DESC"])
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
      ActivityPolicy::Scope.new(context[:current_user], Activity.all).resolve
        .order(created_at: :desc)
        .offset(arguments[:offset]).limit(arguments[:limit])
        .includes(:owner, :recipient, :trackable)
    end

    def likes_by_user(arguments = {})
      LikePolicy::Scope.new(context[:current_user], Like.where(user_id: arguments[:user_id])).resolve.order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def followers_by_user(arguments = {})
      follows = FollowPolicy::Scope.new(context[:current_user], Follow.where(followable_id: User.find(arguments[:user_id]))).resolve.order(created_at: :desc)

      User.joins("JOIN unnest('{#{follows.pluck(:follower_id).map { |uuid| sanitize_sql(uuid) }.join(",")}}'::uuid[]) WITH ORDINALITY t(uuid, ord) USING (uuid)").order("t.ord")
    end

    def followings_by_user(arguments = {})
      follows = FollowPolicy::Scope.new(context[:current_user], Follow.where(follower_id: User.find(arguments[:user_id]))).resolve.order(created_at: :desc)

      User.joins("JOIN unnest('{#{follows.pluck(:followable_id).map { |uuid| sanitize_sql(uuid) }.join(",")}}'::uuid[]) WITH ORDINALITY t(uuid, ord) USING (uuid)").order("t.ord")
    end

    def comments_by_medium(arguments = {})
      CommentPolicy::Scope.new(context[:current_user], Comment.where(medium_id: arguments[:medium_id], parent_id: arguments[:parent_id])).resolve
        .order(updated_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def user(arguments = {})
      User.find(arguments[:id])
    end

    def users(arguments = {})
      users =
        if arguments[:q].present?
          UserPolicy::Scope.new(context[:current_user], User.all).resolve
            .where("users.uuid::varchar = ? OR users.name % ? OR users.slug % ?", arguments[:q], arguments[:q], arguments[:q])
        elsif arguments[:fill_with_following] && context[:current_user].present?
          UserPolicy::Scope.new(context[:current_user],
            User.where(uuid: FollowPolicy::Scope.new(context[:current_user], Follow.where(follower_id: context[:current_user])).resolve.select(:followable_id))
          ).resolve
        else
          User.none
        end

      users.offset(arguments[:offset]).limit(arguments[:limit] > 10 ? 10 : arguments[:limit])
    end

    def session(arguments = {})
      context[:current_session]
    end

    def unread_activity_count
      return 0 if context[:current_user].blank?

      Activity
        .where(recipient: context[:current_user])
        .where.not(owner: context[:current_user])
        .where("activities.created_at > ?", context[:current_user].last_activities_read)
        .count
    end

    def unread_chats_count
      return 0 if context[:current_user].blank?

      ChatPolicy::Scope.new(context[:current_user], Chat.all).resolve
        .where("(chats.recipient_id = ? AND chats.is_recipient_unread) OR (chats.sender_id = ? AND chats.is_sender_unread)", context[:current_user].id, context[:current_user].id)
        .count
    end

    def chats(arguments = {})
      ChatPolicy::Scope.new(context[:current_user], Chat.all).resolve.order("chats.updated_at DESC").includes(:last_message, :sender, :recipient)
    end

    def messages(arguments = {})
      MessagePolicy::Scope.new(context[:current_user], Message.where(chat_id: arguments[:chat_id])).resolve.order("messages.created_at ASC")#.offset(arguments[:offset]).limit(arguments[:limit])
    end

    def likes(arguments = {})
      LikePolicy::Scope.new(context[:current_user], Like.where(medium_id: arguments[:medium_id])).resolve.order("likes.created_at DESC")#.offset(arguments[:offset]).limit(arguments[:limit])
    end

    def blocked_users(arguments = {})
      User.where(uuid: context[:current_user].blocked_users_ids)
    end
  end
end
