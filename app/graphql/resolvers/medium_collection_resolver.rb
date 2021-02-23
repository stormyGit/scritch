module Resolvers
  class MediumCollectionResolver < BaseCollectionResolver
    type Types::MediumType.connection_type, null: false

    model Medium
  end
end
