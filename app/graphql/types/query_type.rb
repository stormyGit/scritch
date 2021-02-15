module Types
  class QueryType < Types::BaseObject
    field :current_user, UserType, null: true

    def current_user
        context[:current_user]
    end

    resource_field Fursuit
    resource_field Maker
    resource_field Event
  end
end


# module Types
#   QueryType = GraphQL::ObjectType.new.tap do |root_type|
#     root_type.name = "Query"
#     root_type.description = "The query root of the schema"

#     root_type.interfaces = []

#     root_type.fields = Util::FieldCombiner.combine([
#       Types::Query::GlobalQuery,
#       Types::Query::ChatQuery,
#       Types::Query::ModerationQuery,
#       Types::Query::FursuitQuery,
#       Types::Query::MakerQuery,
#       Types::Query::MediumQuery,
#       Types::Query::EventQuery,
#       Types::Query::UserQuery,
#     ])
#   end
# end


#     include ActiveRecord::Sanitization::ClassMethods


#    

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


#     def tooltip(args)
#       tooltip = Tooltip.order("RANDOM()").where(public: true).first

#       tooltip
#     end

#     def tooltips
#       tooltips = Tooltip.order("RANDOM()").where(public: true)

#       tooltips
#     end


#     def chats(arguments = {})
#       ChatPolicy::Scope.new(context[:current_user], Chat.all).resolve.order("chats.updated_at DESC").includes(:last_message, :sender, :recipient)
#     end

#     def messages(arguments = {})
#       MessagePolicy::Scope.new(context[:current_user], Message.where(chat_id: arguments[:chat_id])).resolve.order("messages.created_at ASC")#.offset(arguments[:offset]).limit(arguments[:limit])
#     end

#   end
# end
