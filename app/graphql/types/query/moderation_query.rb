include Resolvers::Queries::ModerationQueries

module Types
  module Query
    ModerationQuery = GraphQL::ObjectType.define do
      name 'ModerationQuery'

      field :moderationClaims, function: FetchModerationClaims.new
      field :moderationMakerClaims, function: FetchModerationMakerClaims.new
      field :moderationAdverts, function: FetchModerationAdverts.new
      field :moderationAnalytics, function: FetchModerationAnalytics.new
      field :moderationAnnouncements, function: FetchModerationAnnouncements.new
      field :moderationModerators, function: FetchModerationModerators.new


    end
  end
end
