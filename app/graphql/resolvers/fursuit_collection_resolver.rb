module Resolvers
  class FursuitCollectionResolver < BaseCollectionResolver
    type Types::FursuitType.connection_type, null: false

    model Fursuit
  end
end
