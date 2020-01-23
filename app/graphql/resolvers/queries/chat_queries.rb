module Resolvers
    module Queries
        module ChatQueries
            class GetChats < GraphQL::Function
                type types[Types::ChatType]

                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    ChatPolicy::Scope.new(ctx[:current_user], Chat.all).resolve.order("chats.updated_at DESC").includes(:last_message, :sender, :recipient)
                end
            end
            
            class GetMessages < GraphQL::Function
                type types[Types::MessageType]

                argument :chatId, types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    MessagePolicy::Scope.new(ctx[:current_user], Message.where(chat_id: args[:chatId])).resolve.order("messages.created_at ASC")#.offset(args[:offset]).limit(args[:limit])
                end
            end
            
        end
    end
end
