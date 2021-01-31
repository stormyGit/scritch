module Resolvers
    module Queries
        module GlobalQueries
            class CurrentUser < GraphQL::Function
                description 'get session'
                type Types::SessionType

                def call(obj, args, ctx)
                    ctx[:current_session]
                end
            end

            class GetAdverts < GraphQL::Function
                type types[Types::AdvertType]
                
                argument :uuid, types.ID
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    advert = Advert.order("RANDOM()").where(status: "live").joins(:user).where("users.available_impressions > ?", 0).take(args[:limit])

                    advert.each do |e|
                        e.impressions = e.impressions + 1
                        e.user.available_impressions = e.user.available_impressions - 1
                        if e.user.available_impressions < 1
                            if e.user.available_impressions < 1
                                e.user.available_impressions = 0
                            end
                            e.status = "Out of impressions"
                        end
                        e.save!
                        e.user.save!
                    end
                    advert
                end
            end

            class GetAnnouncements < GraphQL::Function
                type types[Types::AnnouncementType]

                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    if !ctx[:current_user].nil?
                        ctx[:current_user].update!(last_announcements_read: Time.now())
                    end
                    Announcement
                        .order(created_at: :desc)
                        .offset(args[:offset])
                        .limit(args[:limit])
                end
            end
        end
    end
end
