include Resolvers::Queries::ChatQueries

module Types
  module Query
    ChatQuery = GraphQL::ObjectType.define do
      name 'ChatQuery'

      field :chats, function: GetChats.new
      field :messages, function: GetModerationMessages.new
      field :moderationMessages, function: GetModerationMessages.new

    end
  end
end
