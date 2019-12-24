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
        end
    end
end
