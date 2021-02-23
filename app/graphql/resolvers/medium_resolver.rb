module Resolvers
  class MediumResolver < BaseResolver
    type Types::MediumType, null: false

    model Medium
  end
end
