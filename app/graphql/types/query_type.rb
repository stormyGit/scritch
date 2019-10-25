module Types
  QueryType = GraphQL::ObjectType.new.tap do |root_type|
    root_type.name = "Query"
    root_type.description = "The query root of the schema"

    root_type.interfaces = []

    root_type.fields = Util::FieldCombiner.combine([
      Types::Query::GlobalQuery,
      Types::Query::ModerationQuery,
      Types::Query::FursuitQuery,
      Types::Query::MakerQuery,
      Types::Query::MediumQuery,
      Types::Query::EventQuery,
      Types::Query::UserQuery,
      
      # Types::Query::AdvertQuery,
      # Types::Query::ReportQuery,
      # Types::Query::AnnouncementQuery,
      # Types::Query::AdvertQuery,
      # Types::Query::ActivityQuery
    ])
  end
end


#     include ActiveRecord::Sanitization::ClassMethods


#    

#     field :adverts, [AdvertType], null: false do
#       description "List media"
#       argument :uuid, ID, required: false
#       argument :limit, Integer, required: true
#     end

#     field :tooltip, TooltipType, null: false do
#       description "List media"
#       argument :uuid, ID, required: false
#     end

#     field :tooltips, [TooltipType], null: false do
#       description "List media"
#     end

#     field :activities, [ActivityType], null: false do
#       description "Activities"
#       argument :offset, Integer, required: true
#       argument :limit, Integer, required: true
#     end

#     field :announcements, [AnnouncementType], null: false do
#       description "Announcements"
#       argument :offset, Integer, required: true
#       argument :limit, Integer, required: true
#     end

#     field :chats, [ChatType], null: false do
#       description "List chats"
#       argument :offset, Integer, required: true
#       argument :limit, Integer, required: true
#     end

#     field :messages, [MessageType], null: false do
#       description "List messages"
#       argument :chat_id, ID, required: false
#       argument :offset, Integer, required: true
#       argument :limit, Integer, required: true
#     end

#     field :blocked_users, [UserType], null: false do
#       description "List blocked users"
#     end

#     field :ribbon_announcement, RibbonAnnouncementType, null: true do
#       description "Ribbon Announcement events"
#     end

#     def ribbon_announcement
#       RibbonAnnouncement.where(public: true).order(:created_at).last
#     end

#     def adverts(args)
#       advert = Advert.order("RANDOM()").where(status: "live").joins(:user).where("users.available_impressions > ?", 0).take(args[:limit])
#       advert.each do |e|
#         e.impressions = e.impressions + 1
#         e.user.available_impressions = e.user.available_impressions - 1
#         if e.user.available_impressions < 1
#           if e.user.available_impressions < 1
#             e.user.available_impressions = 0
#           end
#           e.status = "Out of impressions"
#         end
#         e.save!
#         e.user.save!
#       end
#       advert
#     end

#     def tooltip(args)
#       tooltip = Tooltip.order("RANDOM()").where(public: true).first

#       tooltip
#     end

#     def tooltips
#       tooltips = Tooltip.order("RANDOM()").where(public: true)

#       tooltips
#     end

#     def activities(arguments = {})
#       act = ActivityPolicy::Scope.new(context[:current_user], Activity.all).resolve
#         .order(created_at: :desc)
#         .offset(arguments[:offset]).limit(arguments[:limit])
#         .includes(:owner, :recipient, :trackable)
#       puts "\n" * 30
#       puts act
#       puts "\n" * 30
#       act
#     end

#     def announcements(arguments = {})
#       if !context[:current_user].nil?
#         context[:current_user].update!(last_announcements_read: Time.now())
#       end
#       Announcement
#         .order(created_at: :desc)
#         .offset(arguments[:offset])
#         .limit(arguments[:limit])
#     end


#     def chats(arguments = {})
#       ChatPolicy::Scope.new(context[:current_user], Chat.all).resolve.order("chats.updated_at DESC").includes(:last_message, :sender, :recipient)
#     end

#     def messages(arguments = {})
#       MessagePolicy::Scope.new(context[:current_user], Message.where(chat_id: arguments[:chat_id])).resolve.order("messages.created_at ASC")#.offset(arguments[:offset]).limit(arguments[:limit])
#     end

#   end
# end
