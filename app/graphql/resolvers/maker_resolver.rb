module Resolvers
  class MakerResolver < BaseResolver
    type Types::MakerType, null: false

    model Maker
  end
end
