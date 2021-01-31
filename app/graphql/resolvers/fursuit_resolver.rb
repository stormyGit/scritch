module Resolvers
  class FursuitResolver < BaseResolver
    type Types::FursuitType, null: false

    model Fursuit
  end
end
