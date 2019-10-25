module Resolvers
    module Queries
        module EventQueries
            class GetEvent < GraphQL::Function
                type Types::EventType

                argument :id, !types.ID

                def call(obj, args, ctx)
                    Event.find(args[:id])
                end
            end
            
            class GetEvents < GraphQL::Function
                type types[Types::EventType]

                argument :limit, !types.Int
                argument :offset, !types.Int
                argument :name, types.String
                argument :country, types.String
                argument :status, !types.String

                def call(obj, args, ctx)
                    events = Event.all

                    if args[:name].present?
                        events = events.where("events.name @@ ? or events.name ilike ?", args[:name], "%#{args[:name]}%")
                    end
            
                    if args[:country].present?
                        events = events.joins(:editions).where("editions.country = ?", args[:country])
                    end
            
                    if args[:status].present?
                        events = events.where("events.status = ?", args[:status])
                    end
            
                    events.offset(args[:offset]).limit(args[:limit]).distinct.order(:name)
                end
            end
            
            class GetEdition < GraphQL::Function
                type Types::EditionType
              
                argument :id, !types.ID

                def call(obj, args, ctx)
                    Edition.find(args[:id])
                end
            end
              
            class GetEditions < GraphQL::Function
                type types[Types::EditionType]

                argument :name, types.String
                argument :eventId, types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    editions = Edition.all

                    if args[:eventId].present?
                        editions = editions.where("editions.event_id = ?", args[:eventId])
                    end
            
                    if args[:name].present?
                        editions = editions.where("editions.name @@ ?", args[:name])
                    end
            
                    editions.offset(args[:offset]).limit(args[:limit]).order(year: :desc)
                end
            end

            class GetSubEvents < GraphQL::Function
                type types[Types::SubEventType]

                argument :name, types.String
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    sub_events = SubEvent.all

                    if args[:name].present?
                        sub_events = sub_events.where("sub_events.name @@ ?", args[:name])
                    end
                
                    sub_events.offset(args[:offset]).limit(args[:limit]).order(:name)
                end
            end
            
            class GetEventsCountry < GraphQL::Function
                type types[types.String]

                def call(obj, args, ctx)
                    Edition.all.distinct.order(:country).pluck(:country)
                end
            end

            class GetEventsStatuses < GraphQL::Function
                type types[types.String]

                def call(obj, args, ctx)
                    Event.all.distinct.order(:status).pluck(:status)
                end
            end
        end
    end
end
