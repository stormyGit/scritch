include Resolvers::Queries::GlobalQueries

module Types
  module Query
    GlobalQuery = GraphQL::ObjectType.define do
      name 'GlobalQuery'

      field :session, function: GetSession.new
    end
  end
end
