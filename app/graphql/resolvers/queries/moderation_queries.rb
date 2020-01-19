module Resolvers
    module Queries
        module ModerationQueries
            class FetchModerators < GraphQL::Function
                description 'Get Moderators'
                type types[Types::ModeratorType]

                def call(obj, args, ctx)
                    Moderator.all.order(:name)
                end
            end

            class FetchModerationModerators < GraphQL::Function
                type types[Types::ModeratorType]

                def call(obj, args, ctx)
                    moderators = Moderator.all.order(created_at: :desc)
                    moderators
                end
            end

            class FetchModerationAdverts < GraphQL::Function
                type types[Types::AdvertType]

                argument :filter, types.String

                def call(obj, args, ctx)
                    adverts = Advert.all.order(created_at: :desc)
                    if args[:filter].present?
                        adverts = adverts.where(status: args[:filter])
                    end
                    adverts
                end
            end

            class FetchModerationAnalytics < GraphQL::Function
                type Types::AnalyticType

                def call(obj, args, ctx)
                  total = 0
                  Medium.find_each do |m|
                    total = total + m.completion
                  end
                  average_completion = total.to_f / Medium.count
                  total = 0
                  Advert.find_each do |m|
                    total = total + m.impressions
                  end
                  impressions_now = total

                  analytics = {
                    users: User.count,
                    suspended: SuspendedUser.count,
                    moderators: Moderator.count,
                    media: Medium.count,
                    tags: FursuitMedium.count,
                    adverts: Advert.count,
                    impressions: impressions_now,
                    makers: Maker.count,
                    claimed_makers: Maker.where.not(user: nil).count,
                    fursuits: Fursuit.count,
                    claimed_fursuits: FursuitUser.count,
                    reports: Report.count + TagReport.count + MediumReport.count + CommentReport.count,
                    reports_open: Report.where(status: "new", assignee_id: nil).count + TagReport.where(status: "new", assignee_id: nil).count + MediumReport.where(status: "new", assignee_id: nil).count + CommentReport.where(status: "new", assignee_id: nil).count,
                    average_completion: average_completion,
                    scritches: Like.count,
                    faves: Fave.count,
                    sponsors: Sponsor.count,
                    events: Event.count,
                    editions: Edition.count,
                    storage_disk_usage: "#{`df -m /`.split(/\b/)[24].to_i}%"
                  }
                end
            end
        end
    end
end
