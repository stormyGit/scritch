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
      argument :fursuit_id, ID, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :activities, [ActivityType], null: false do
      description "Activities"
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :announcements, [AnnouncementType], null: false do
      description "Announcements"
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

    field :event, EventType, null: false do
      description "Find a event by ID"
      argument :id, ID, required: true
    end

    field :events, [EventType], null: false do
      description "List events"
      argument :name, String, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :edition, EditionType, null: false do
      description "Find a edition by ID"
      argument :id, ID, required: true
    end

    field :editions, [EditionType], null: false do
      description "List editions"
      argument :name, String, required: false
      argument :event_id, ID, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :fursuit, FursuitType, null: false do
      description "Find a fursuit by ID"
      argument :id, ID, required: true
    end

    field :fursuits, [FursuitType], null: false do
      description "List fursuits"
      argument :name, String, required: false
      argument :limit, Integer, required: false
      argument :offset, Integer, required: false
      argument :fursuit_specy, String, required: false
      argument :fursuit_style, String, required: false
      argument :fursuit_leg_type, String, required: false
    end

    field :maker, MakerType, null: false do
      description "Find a maker by ID"
      argument :id, ID, required: true
    end

    field :makers, [MakerType], null: false do
      description "List makers"
      argument :limit, Integer, required: false
      argument :offset, Integer, required: false
      argument :name, String, required: false
      argument :country, String, required: false
    end

    field :categories, [CategoryType], null: false do
      description "List makers"
      argument :limit, Integer, required: false
      argument :offset, Integer, required: false
      argument :name, String, required: false
    end

    def categories(arguments)
      categories = Category.all

      if arguments[:name].present?
        categories = categories.where("name @@ ? or name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end
      categories.offset(arguments[:offset]).limit(arguments[:limit]).order(:name)
    end


    def fursuit(arguments)
      Fursuit.find(arguments[:id])
    end

    def fursuits(arguments)
      fursuits = Fursuit.all
      if arguments[:fursuit_specy].present?
        fursuits = fursuits.where(fursuit_specy_id: FursuitSpecy.find_by(name: arguments[:fursuit_specy]))
      end

      if arguments[:fursuit_style].present?
        fursuits = fursuits.where(fursuit_style_id: FursuitStyle.find_by(name: arguments[:fursuit_style]))
      end

      if arguments[:fursuit_leg_type].present?
        fursuits = fursuits.where(fursuit_leg_type_id: FursuitLegType.find_by(name: arguments[:fursuit_leg_type]))
      end

      if arguments[:name].present?
        fursuits = fursuits.where("name @@ ? or name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end
      fursuits.offset(arguments[:offset]).limit(arguments[:limit]).order(:name)
    end

    def maker(arguments)
      Maker.find(arguments[:id])
    end

    def makers(arguments)
      makers = Maker.all

      if arguments[:country].present?
        makers = makers.where(country: arguments[:country])
      end

      if arguments[:name].present?
        makers = makers.where("name @@ ? or name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end

      makers.offset(arguments[:offset]).limit(arguments[:limit]).order(:name)

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
          media.order("media.created_at DESC, media.created_at DESC")
        when 'trending'
          media.order(["media.likes_count DESC, media.created_at DESC"])
        when 'subscriptions'
          media.where(user: context[:current_user].all_following).order("media.created_at DESC, media.created_at DESC")
        else
          media
        end

      if arguments[:user_id].present?
        media = media.where(user_id: arguments[:user_id])
      end

      if arguments[:fursuit_id].present?
        media = media.where(fursuit_id: arguments[:fursuit_id])
      end

      media.includes(:tags).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def event(arguments)
      Event.find(arguments[:id])
    end

    def events(arguments)
      events = Event.all

      if arguments[:name].present?
        events = events.where("name @@ ? or name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end

      events.offset(arguments[:offset]).limit(arguments[:limit]).order(:name)
    end

    def edition(arguments)
      Edition.find(arguments[:id])
    end

    def editions(arguments)
      editions = Edition.all

      if arguments[:event_id].present?
        editions = editions.where("editions.event_id = ?", arguments[:event_id])
      end

      if arguments[:name].present?
        editions = editions.where("editions.name @@ ?", arguments[:name])
      end

      editions.offset(arguments[:offset]).limit(arguments[:limit]).order(year: :desc)
    end

    def activities(arguments = {})
      ActivityPolicy::Scope.new(context[:current_user], Activity.all).resolve
        .order(created_at: :desc)
        .offset(arguments[:offset]).limit(arguments[:limit])
        .includes(:owner, :recipient, :trackable)
    end

    def announcements(arguments = {})
      Announcement
        .order(created_at: :desc)
        .offset(arguments[:offset])
        .limit(arguments[:limit])
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
      raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], Medium.find(arguments[:medium_id])).show?

      CommentPolicy::Scope.new(context[:current_user], Comment.where(medium_id: arguments[:medium_id], parent_id: arguments[:parent_id])).resolve
        .order(updated_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def user(arguments = {})
      user = User.find(arguments[:id])
      raise Pundit::NotAuthorizedError unless UserPolicy.new(context[:current_user], user).show?

      user
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
