include Resolvers::Queries::ChatQueries

module Types
  module Query
    ChatQuery = GraphQL::ObjectType.define do
      name 'ChatQuery'

      field :chats, function: GetChats.new
      field :messages, function: GetMessages.new

    end
  end
end
