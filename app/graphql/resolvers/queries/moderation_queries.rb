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
                    users: 0, #User.count,
                    suspended: 0, #SuspendedUser.count,
                    moderators: 0, #Moderator.count,
                    media: 0, #Medium.count,
                    tags: 0, #FursuitMedium.count,
                    adverts: 0, #Advert.count,
                    impressions: 0, #impressions_now,
                    makers: 0, #Maker.count,
                    claimed_makers: 0, #Maker.where.not(user: nil).count,
                    fursuits: 0, #Fursuit.count,
                    claimed_fursuits: 0, #FursuitUser.count,
                    reports: 0, #Report.count + TagReport.count + MediumReport.count + CommentReport.count,
                    reports_open: 0, #Report.where(status: "new", assignee_id: nil).count + TagReport.where(status: "new", assignee_id: nil).count + MediumReport.where(status: "new", assignee_id: nil).count + CommentReport.where(status: "new", assignee_id: nil).count,
                    average_completion: 0, #average_completion,
                    scritches: 0,
                    faves: 0,
                    sponsors: 0,
                    events: 0,
                    editions: 0,
                    storage_disk_usage: "0%", #{}"#{`df -m /`.split(/\b/)[24].to_i}%"
                  }
                end
            end
        end
    end
end
