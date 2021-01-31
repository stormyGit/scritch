include Resolvers::Queries::GlobalQueries

module Types
  module Query
    GlobalQuery = GraphQL::ObjectType.define do
      name 'GlobalQuery'

      field :current_user, function: CurrentUser.new
      field :adverts, function: GetAdverts.new
      field :announcements, function: GetAnnouncements.new
    end
  end
end
