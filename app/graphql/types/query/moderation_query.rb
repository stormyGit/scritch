include Resolvers::Queries::ModerationQueries

module Types
  module Query
    ModerationQuery = GraphQL::ObjectType.define do
      name 'ModerationQuery'

      field :moderators, function: FetchModerators.new
      field :moderationAdverts, function: FetchModerationAdverts.new


    end
  end
end
