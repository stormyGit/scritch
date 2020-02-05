module Resolvers
    module Queries
        module ChatQueries
            class GetChats < GraphQL::Function
                type types[Types::ChatType]

                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    Chat.where(recipient: ctx[:current_user]).includes(:last_message, :sender, :recipient)
                end
            end
            
            class GetModerationMessages < GraphQL::Function
                type types[Types::MessageType]

                argument :caseId, types.ID
                argument :chatId, types.ID
                argument :caseType, types.String
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    if args[:chatId].present?
                        Message.where(chat: Chat.find(args[:chatId])).order("messages.created_at ASC")
                    else 
                        Message.where(chat: Chat.find_by(case_id: args[:caseId], case_type: args[:caseType])).order("messages.created_at ASC")
                    end
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
