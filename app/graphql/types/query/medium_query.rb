include Resolvers::Queries::MediumQueries

module Types
  module Query
    MediumQuery = GraphQL::ObjectType.define do
      name 'MediumQuery'

      field :medium, function: GetMedium.new
      field :media, function: GetMedia.new
      field :frontMedia, function: GetFrontMedia.new
      field :favedMedia, function: GetFavedMedia.new
      field :fursuitMedia, function: GetFursuitMedia.new
      field :userMedia, function: GetUserMedia.new
      field :eventMedia, function: GetEventMedia.new
      field :likes, function: GetLikes.new
      field :faves, function: GetFaves.new
      field :commentsByMedium, function: GetComments.new

    end
  end
end
