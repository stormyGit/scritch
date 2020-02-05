module Types
  class AnalyticType < Types::BaseObject
    description "Analytic object"

    field :users, Integer, null: false
    field :suspended, Integer, null: false
    field :moderators, Integer, null: false
    field :media, Integer, null: false
    field :tags, Integer, null: false
    field :adverts, Integer, null: false
    field :impressions, Integer, null: false
    field :makers, Integer, null: false
    field :claimed_makers, Integer, null: false
    field :fursuits, Integer, null: false
    field :claimed_fursuits, Integer, null: false
    field :reports, Integer, null: false
    field :reports_open, Integer, null: false
    field :average_completion, Integer, null: false
    field :scritches, Integer, null: false
    field :faves, Integer, null: false
    field :sponsors, Integer, null: false
    field :events, Integer, null: false
    field :editions, Integer, null: false
    field :storage_disk_usage, String, null: false
    field :users_count, [ChartDataType], null: false
    field :sponsors_count, [ChartDataType], null: false
    field :media_count, [ChartDataType], null: false
    field :impressions_count, [ChartDataType], null: false
    field :impressions_per_day, [ChartDataType], null: false
    field :average_completion_per_day, [ChartDataType], null: false
  end
end
