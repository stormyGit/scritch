module Resolvers
    module Queries
        module GlobalQueries
            class GetSession < GraphQL::Function
                description 'get session'
                type Types::SessionType

                def call(obj, args, ctx)
                    ctx[:current_session]
                end
            end
        end
    end
end
