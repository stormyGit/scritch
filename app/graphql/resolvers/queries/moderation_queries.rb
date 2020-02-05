module Resolvers
    module Queries
        module ModerationQueries
            class FetchModerationAnnouncements < GraphQL::Function
                type types[Types::AnnouncementType]

                def call(obj, args, ctx)
                    Announcement.all.order(created_at: :desc)
                end
            end

            class FetchModerationSuspended < GraphQL::Function
                type types[Types::SuspendedUserType]

                def call(obj, args, ctx)
                    SuspendedUser.all.order(created_at: :desc)
                end
            end

            class FetchModerationClaims < GraphQL::Function
                type types[Types::ClaimType]

                def call(obj, args, ctx)
                    Claim.where(status: "open").order(:created_at)
                end
            end

            class FetchModerationMakerClaims < GraphQL::Function
                type types[Types::MakerClaimType]

                def call(obj, args, ctx)
                    MakerClaim.where(status: "open").order(:created_at)
                end
            end

            class FetchModerationModerators < GraphQL::Function
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

                  users_count = Statistic.pluck("date_trunc('day', created_at)", :users)
                  users_count.each do |u|
                    if u.present?
                      tmp = u[0].to_s
                      u[0] = tmp[0..tmp.index(':') - 4]
                    end
                  end  

                  sponsors_count = Statistic.pluck("date_trunc('day', created_at)", :sponsors)
                  sponsors_count.each do |u|
                    if u.present?
                      tmp = u[0].to_s
                      u[0] = tmp[0..tmp.index(':') - 4]
                    end
                  end
              
                  media_count = Statistic.pluck("date_trunc('day', created_at)", :media)
                  media_count.each do |u|
                    if u.present?
                      tmp = u[0].to_s
                      u[0] = tmp[0..tmp.index(':') - 4]
                    end
                  end
              
                  average_completion_per_day = Statistic.pluck("date_trunc('day', created_at)", :average_completion)
                  average_completion_per_day.each do |u|
                    if u.present?
                      tmp = u[0].to_s
                      u[0] = tmp[0..tmp.index(':') - 4]
                    end
                  end
              
                  users_per_day = []
                  users_count.sort.each_with_index do |u, index|
                    users_per_day = users_per_day + [[u[0], users_count.sort[index][1].to_i - (index == 0 ? 0 : users_count.sort[index - 1][1].to_i)]]
                  end
              
                  impressions_count = Statistic.pluck("date_trunc('day', created_at)", :impressions)
                  impressions_count.each do |u|
                    if u.present?
                      tmp = u[0].to_s
                      u[0] = tmp[0..tmp.index(':') - 4]
                    end
                  end
              
                  impressions_per_day = []
                  impressions_count.sort.each_with_index do |u, index|
                    impressions_per_day = impressions_per_day + [[u[0], impressions_count.sort[index][1].to_i - (index == 0 ? 0 : impressions_count.sort[index - 1][1].to_i)]]
                  end

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
                    storage_disk_usage: "#{`df -m /`.split(/\b/)[24].to_i}%",
                    users_count: users_count,
                    users_per_day: users_per_day,
                    sponsors_count: sponsors_count,
                    media_count: media_count,
                    impressions_count: impressions_count,
                    impressions_per_day: impressions_per_day,
                    average_completion_per_day: average_completion_per_day,
                  }
                end
            end
        end
    end
end
