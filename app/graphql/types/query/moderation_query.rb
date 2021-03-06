include Resolvers::Queries::ModerationQueries

module Types
  module Query
    ModerationQuery = GraphQL::ObjectType.define do
      name 'ModerationQuery'

      field :moderationReports, function: FetchModerationReports.new
      field :moderationMediumReports, function: FetchModerationMediumReports.new
      field :moderationCommentReports, function: FetchModerationCommentReports.new
      # field :moderationClaims, function: FetchModerationClaims.new

      field :moderationSponsors, function: FetchModerationSponsors.new

      field :moderationTechReports, function: FetchModerationTechReports.new

      field :moderationClaims, function: FetchModerationClaims.new
      field :moderationMakerClaims, function: FetchModerationMakerClaims.new
      field :moderationAdverts, function: FetchModerationAdverts.new
      field :moderationFursuitRequests, function: FetchModerationFursuitRequests.new
      field :moderationMakerRequests, function: FetchModerationMakerRequests.new
      field :moderationEventRequests, function: FetchModerationEventRequests.new
      field :moderationAnalytics, function: FetchModerationAnalytics.new
      field :moderationAnnouncements, function: FetchModerationAnnouncements.new
      field :moderationModerators, function: FetchModerationModerators.new
      field :moderationSuspended, function: FetchModerationSuspended.new


    end
  end
end
