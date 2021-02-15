module Resolvers
  class MakerCollectionResolver < BaseCollectionResolver
    type Types::MakerType.connection_type, null: false

    model Maker
  end
end
