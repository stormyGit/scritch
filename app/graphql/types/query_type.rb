module Types
  class QueryType < Types::BaseObject
    include ActiveRecord::Sanitization::ClassMethods

    field :commission_statuses, [CommissionStatusType], null: false do
      description "Find a medium by ID"
    end
    field :fursuit_leg_types, [FursuitLegTypeType], null: false do
      description "Find a medium by ID"
    end
    field :fursuit_styles, [FursuitStyleType], null: false do
      description "Find a medium by ID"
    end
    field :fursuit_genders, [FursuitGenderType], null: false do
      description "Find a medium by ID"
    end
    field :species, [SpecyType], null: false do
      description "Find a medium by ID"
    end
    field :hybrid_species, [SpecyType], null: false do
      description "Find a medium by ID"
      argument :species, [String, null: true], required: true
    end
    field :fursuit_fingers, [FursuitFingerType], null: false do
      description "Find a medium by ID"
    end
    field :fursuit_builds, [FursuitBuildType], null: false do
      description "Find a medium by ID"
    end
    field :fursuit_paddings, [FursuitPaddingType], null: false do
      description "Find a medium by ID"
    end

    field :medium, MediumType, null: false do
      description "Find a medium by ID"
      argument :id, ID, required: true
      argument :tagging, Boolean, required: false
    end

    field :media, [MediumType], null: false do
      description "List media"
      argument :q, String, required: false
      argument :sort, String, required: false
      argument :filter, String, required: false
      argument :user_id, ID, required: false
      argument :fursuit_id, ID, required: false
      argument :category_id, ID, required: false
      argument :sub_event_id, ID, required: false
      argument :fursuits, [ID, null: true], required: false
      argument :offset, Integer, required: true
      argument :uuid, ID, required: false
      argument :limit, Integer, required: true
      argument :tagging, Boolean, required: false
      argument :gifs, Boolean, required: false
      argument :faves, Boolean, required: false
      argument :edition_id, ID, required: false
      argument :event_id, ID, required: false
    end

    field :front_media, [MediumType], null: false do
      description "List media"
      argument :filter, String, required: true
      argument :limit, Integer, required: true
    end

    field :fursuit_media, [MediumType], null: false do
      description "List media"
      argument :fursuit_id, ID, required: true
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :user_media, [MediumType], null: false do
      description "List media"
      argument :user_id, ID, required: true
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :event_media, [MediumType], null: false do
      description "List media"
      argument :event_id, ID, required: true
      argument :edition_id, ID, required: false
      argument :offset, Integer, required: true
      argument :limit, Integer, required: true
    end

    field :adverts, [AdvertType], null: false do
      description "List media"
      argument :uuid, ID, required: false
      argument :limit, Integer, required: true
    end

    field :tooltip, TooltipType, null: false do
      description "List media"
      argument :uuid, ID, required: false
    end

    field :tooltips, [TooltipType], null: false do
      description "List media"
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

    field :faves_by_user, [FaveType], null: false do
      description "List faves by user"
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

    field :faves, [FaveType], null: false do
      description "List faves"
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
      argument :country, String, required: false
      argument :status, String, required: false
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

    field :sub_events, [SubEventType], null: false do
      description "List sub events"
      argument :name, String, required: false
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
      argument :limit, Integer, required: true
      argument :offset, Integer, required: true
      argument :exclude, [ID], required: false
      argument :hybrid_search, Boolean, required: false
      argument :species_ids, [ID, null: true], required: false
      argument :uuid, ID, required: false
      argument :filter, String, required: false
      argument :fursuit_style, ID, required: false
      argument :fursuit_leg_type, ID, required: false
      argument :fursuit_build, ID, required: false
      argument :fursuit_padding, ID, required: false
      argument :fursuit_fingers, ID, required: false
      argument :fursuit_genders, ID, required: false
      argument :fursuit_color, String, required: false
      argument :fursuit_eyes, String, required: false
      argument :maker, ID, required: false
      argument :user_id, ID, required: false
    end

    field :maker, MakerType, null: false do
      description "Find a maker by ID"
      argument :id, ID, required: true
      argument :sort, String, required: true
    end

    field :makers_select, [MakerType], null: false do
      description "makers select"
    end

    field :makers, [MakerType], null: false do
      description "List makers"
      argument :limit, Integer, required: false
      argument :offset, Integer, required: false
      argument :name, String, required: false
      argument :country, String, required: false
      argument :commission_status, ID, required: false
      argument :region, String, required: false
    end

    field :makers_country, [String, null:true], null: false do
      description "List makers"
    end

    field :makers_region, [String, null:true], null: false do
      description "List makers"
      argument :country, String, required: true
    end

    field :events_country, [String, null: true], null: false do
      description "List events"
    end

    field :events_statuses, [String, null: true], null: false do
      description "List events"
    end

    field :ribbon_announcement, RibbonAnnouncementType, null: true do
      description "Ribbon Announcement events"
    end

    field :categories, [CategoryType], null: false do
      description "List makers"
      argument :limit, Integer, required: false
      argument :offset, Integer, required: false
      argument :name, String, required: false
    end

    def ribbon_announcement
      RibbonAnnouncement.where(public: true).order(:created_at).last
    end

    def adverts(args)
      advert = Advert.order("RANDOM()").where(status: "live").joins(:user).where("users.available_impressions > ?", 0).take(args[:limit])
      advert.each do |e|
        e.impressions = e.impressions + 1
        e.user.available_impressions = e.user.available_impressions - 1
        if e.user.available_impressions < 1
          if e.user.available_impressions < 1
            e.user.available_impressions = 0
          end
          e.status = "Out of impressions"
        end
        e.save!
        e.user.save!
      end
      advert
    end

    def tooltip(args)
      tooltip = Tooltip.order("RANDOM()").where(public: true).first

      tooltip
    end

    def tooltips
      tooltips = Tooltip.order("RANDOM()").where(public: true)

      tooltips
    end

    def commission_statuses
      CommissionStatus.all.order(:name)
    end

    def makers_country
      Maker.all.distinct.order(:country).pluck(:country)
    end

    def makers_region(args)
      Maker.where(country: args[:country]).distinct.order(:region).pluck(:region)
    end

    def events_country
      Edition.all.distinct.order(:country).pluck(:country)
    end

    def events_statuses
      Event.all.distinct.order(:status).pluck(:status)
    end

    def fursuit_leg_types
      FursuitLegType.all.order(:name)
    end

    def fursuit_styles
      FursuitStyle.all.order(:name)
    end

    def fursuit_genders
      FursuitGender.all.order(:name)
    end

    def species
      Specy.all.order(:name)
    end

    def hybrid_species(args)
      Specy.all.order(:name)
    end

    def fursuit_paddings
      FursuitPadding.all.order(:name)
    end

    def fursuit_builds
      FursuitBuild.all.order(:name)
    end

    def fursuit_fingers
      FursuitFinger.all.order(:name)
    end

    def categories(arguments)
      categories = Category.all

      if arguments[:name].present?
        categories = categories.where("name @@ ? or name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end
      categories.offset(arguments[:offset]).limit(arguments[:limit]).order(:name)
    end


    def fursuit(arguments)
      Fursuit.where(visible: true).find(arguments[:id])
    end

    def fursuits(arguments)
      fursuits = Fursuit.where(visible: true)

      if arguments[:filter].present? && arguments[:filter] == "subscriptions_fursuits"
        fursuits = fursuits.joins(:makers).where("makers.uuid IN (?)", context[:current_user].followed_makers.pluck(:uuid))
          .where("fursuits.created_at > ?", context[:current_user].last_seen_makers)
          .order("fursuits.created_at DESC")
      end

      if arguments[:user_id].present?
        fursuits = fursuits.joins(:users).where("users.uuid = ?", arguments[:user_id])
      end

      if arguments[:species_ids].present? && arguments[:hybrid_search].present? && arguments[:hybrid_search] == true
        fursuits = fursuits.where(is_hybrid: true).joins(:species).where(species: {uuid: arguments[:species_ids]}).group("fursuits.id").having('count(fursuits.id) >= ?', arguments[:species_ids].size)
      end

      if arguments[:species_ids].present? && (arguments[:hybrid_search].blank? || arguments[:hybrid_search] == false)
        fursuits = fursuits.where(is_hybrid: false).joins(:species).where(species: {uuid: arguments[:species_ids]}).group("fursuits.id").having('count(fursuits.id) >= ?', arguments[:species_ids].size)
      end

      if arguments[:fursuit_style].present?
        fursuits = fursuits.where(fursuit_style_id: FursuitStyle.find(arguments[:fursuit_style]))
      end

      if arguments[:fursuit_leg_type].present?
        fursuits = fursuits.where(fursuit_leg_type_id: FursuitLegType.find(arguments[:fursuit_leg_type]))
      end

      if arguments[:fursuit_build].present?
        fursuits = fursuits.where(fursuit_build_id: FursuitBuild.find(arguments[:fursuit_build]))
      end

      if arguments[:fursuit_genders].present?
        fursuits = fursuits.where(fursuit_gender_id: FursuitGender.find(arguments[:fursuit_genders]))
      end

      if arguments[:fursuit_fingers].present?
        fursuits = fursuits.where(fursuit_finger_id: FursuitFinger.find(arguments[:fursuit_fingers]))
      end

      if arguments[:fursuit_padding].present?
        fursuits = fursuits.where(fursuit_padding_id: FursuitPadding.find(arguments[:fursuit_padding]))
      end

      if arguments[:fursuit_color].present?
        fursuits = fursuits.where(base_color: arguments[:fursuit_color])
      end

      if arguments[:fursuit_eyes].present?
        fursuits = fursuits.where(eyes_color: arguments[:fursuit_eyes])
      end

      if arguments[:maker].present?
        fursuits = fursuits.joins(:makers).where("makers.uuid = ?", arguments[:maker])
      end

      if arguments[:name].present?
        fursuits = fursuits.where("fursuits.name @@ ? or fursuits.name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end

      if arguments[:exclude].present?
        fursuits = fursuits.where.not("uuid IN (?)", arguments[:exclude])
      end
      fursuits.offset(arguments[:offset]).limit(arguments[:limit]).order(:name, :uuid)
    end

    def makers_select()
      Maker.all.order(:name)
    end

    def maker(arguments)
      Maker.where(visible: true).find(arguments[:id])
    end

    def makers(arguments)
      makers = Maker.where(visible: true)

      if arguments[:commission_status].present?
        makers = makers.where(commission_status_id: arguments[:commission_status])
      end

      if arguments[:country].present?
        makers = makers.where(country: arguments[:country])
      end

      if arguments[:region].present?
        makers = makers.where(region: arguments[:region])
      end

      if arguments[:name].present?
        makers = makers.where("name @@ ? or name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end

      makers.offset(arguments[:offset]).limit(arguments[:limit]).order(:name)

    end

    def medium(arguments = {})
      medium = Medium.includes(comments: [:user]).find(arguments[:id])
      raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).show?

      if (arguments[:tagging].present? && arguments[:tagging] == true)
        raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).unlock?
      end
      View.add(arguments[:id], context[:current_user_references])

      medium
    end

    def media(arguments = {})
      media = MediumPolicy::Scope.new(context[:current_user], Medium.all).resolve.includes(:user)

      if arguments[:faves].present?
        media = media.joins(:faves).where("faves.user_id = ?", context[:current_user].uuid)
      end

      media =
        case arguments[:sort]
        when 'latest'
          media.order("media.created_at DESC, media.created_at DESC")
        when 'earliest'
          media.order("media.created_at, media.created_at")
        when 'scritches'
          media.order(["media.likes_count DESC, media.created_at DESC"])
        when 'scritches_month'
          media.where("media.created_at > ?", 30.days.ago).order(["media.likes_count DESC, media.created_at DESC"])
        when 'views'
          media.order(["media.views_count DESC, media.created_at DESC"])
        when 'faves'
          media.order(["media.faves_count DESC, media.created_at DESC"])
        when 'leastComplete'
          media.order(["media.completion, media.created_at DESC"])
        when 'mostComplete'
          media.order(["media.completion DESC, media.created_at DESC"])
        when 'random'
          media.order("RANDOM()")
        else
          media
        end

      media =
        case arguments[:filter]
        when 'subscriptions_users'
          media.where(user: context[:current_user].all_following)
            .where("media.created_at > ?", context[:current_user].last_seen_media)
            .order("media.created_at DESC, media.created_at DESC")
        when 'subscriptions_fursuits'
          Medium.joins(:fursuits)
            .where("fursuits.uuid IN (?)", context[:current_user].subscriptions.pluck(:uuid))
            .where("media.created_at > ?", context[:current_user].last_seen_fursuits)
            .order(["media.created_at DESC, media.created_at DESC"])
        else
          media
        end


      if arguments[:event_id].present?
        media = media.joins(:edition).where("editions.event_id = ?", arguments[:event_id])
      end
      if arguments[:edition_id].present?
        media = media.where(edition_id: arguments[:edition_id])
      end
      if arguments[:sub_event_id].present?
        media = media.where(sub_event_id: arguments[:sub_event_id])
      end

      if arguments[:gifs].present? && arguments[:gifs] == true
        media = media.where(is_gif: true)
      end

      if arguments[:category_id].present?
        media = media.where(category_id: arguments[:category_id])
      end



      if arguments[:fursuits].present? && arguments[:filter] == 'subscriptions_fursuits'
        media = media.joins(:fursuits).where(fursuits: {uuid: arguments[:fursuits]}).group("media.id").having('count(media.id) >= ?', arguments[:fursuits].size)
      elsif arguments[:fursuits].present?
        media = media.joins(:fursuits).where(fursuits: {uuid: arguments[:fursuits]}).group("media.id", "users.id").having('count(media.id) >= ?', arguments[:fursuits].size)
      end

      if arguments[:tagging].present?
        media = media.where.not("completion > ?", 99).where(tag_locked: false).order(:completion)
      end

      media.offset(arguments[:offset]).limit(arguments[:limit])
    end

    def front_media(arguments = {})
      media = MediumPolicy::Scope.new(context[:current_user], Medium.all).resolve.includes(:user)

      media =
        case arguments[:filter]
        when 'latest'
          media.order("media.created_at DESC, media.created_at DESC")
        when 'scritches'
          media.where("media.created_at > ?", 30.days.ago).order(["media.likes_count DESC, media.created_at DESC"])
        else
          media
        end

      media.limit(arguments[:limit])
    end

    def fursuit_media(arguments = {})
      media = MediumPolicy::Scope.new(context[:current_user], Medium.all).resolve.includes(:user)
      media = media.joins(:fursuits).where("fursuits.slug = ? AND fursuits.visible = ?", arguments[:fursuit_id], true)

      media.order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def user_media(arguments = {})
      media = MediumPolicy::Scope.new(context[:current_user], Medium.all).resolve.includes(:user)
      media = media.where(user_id: arguments[:user_id])

      media.order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def event_media(arguments = {})
      media = MediumPolicy::Scope.new(context[:current_user], Medium.all).resolve.includes(:user)
      media = media.joins(:edition).where("editions.event_id = ?", arguments[:event_id])
      if arguments[:edition_id].present?
        media = media.where(edition_id: arguments[:edition_id])
      end

      media.order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def event(arguments)
      Event.find(arguments[:id])
    end

    def events(arguments)
      events = Event.all

      if arguments[:name].present?
        events = events.where("events.name @@ ? or events.name ilike ?", arguments[:name], "%#{arguments[:name]}%")
      end

      if arguments[:country].present?
        events = events.joins(:editions).where("editions.country = ?", arguments[:country])
      end

      if arguments[:status].present?
        events = events.where("events.status = ?", arguments[:status])
      end

      events.offset(arguments[:offset]).limit(arguments[:limit]).distinct.order(:name)
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

    def sub_events(arguments)
      sub_events = SubEvent.all

      if arguments[:name].present?
        sub_events = sub_events.where("sub_events.name @@ ?", arguments[:name])
      end

      sub_events.offset(arguments[:offset]).limit(arguments[:limit]).order(:name)
    end

    def activities(arguments = {})
      act = ActivityPolicy::Scope.new(context[:current_user], Activity.all).resolve
        .order(created_at: :desc)
        .offset(arguments[:offset]).limit(arguments[:limit])
        .includes(:owner, :recipient, :trackable)
      puts "\n" * 30
      puts act
      puts "\n" * 30
      act
    end

    def announcements(arguments = {})
      if !context[:current_user].nil?
        context[:current_user].update!(last_announcements_read: Time.now())
      end
      Announcement
        .order(created_at: :desc)
        .offset(arguments[:offset])
        .limit(arguments[:limit])
    end

    def likes_by_user(arguments = {})
      LikePolicy::Scope.new(context[:current_user], Like.where(user_id: arguments[:user_id])).resolve.order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
    end

    def faves_by_user(arguments = {})
      FavePolicy::Scope.new(context[:current_user], Fave.where(user_id: arguments[:user_id])).resolve.order(created_at: :desc).offset(arguments[:offset]).limit(arguments[:limit])
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

    def faves(arguments = {})
      FavePolicy::Scope.new(context[:current_user], Fave.where(medium_id: arguments[:medium_id])).resolve.order("faves.created_at DESC")#.offset(arguments[:offset]).limit(arguments[:limit])
    end

    def blocked_users(arguments = {})
      User.where(uuid: context[:current_user].blocked_users_ids)
    end
  end
end

  # Fursuit.select('* from (
  #     select fursuits.*, array_agg(species.id) species_ids
  #     from fursuits
  #     inner join fursuit_species on fursuit_species.fursuit_id = fursuits.id
  #     inner join species on species.id = fursuit_species.species_id
  #   ) tmp_fursuits'
  # ).where('tmp_fursuits.species_ids = (:species_ids)', SPECIES)
