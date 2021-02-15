module Resolvers
  class FursuitCollectionResolver < BaseCollectionResolver
    type Types::FursuitType.connection_type, null: false

    model Fursuit

    option(:species_ids, type: [String], null: true) do |scope, value|
      scope.joins(:species).where(species: {uuid: value}).distinct
    end

    option(:maker_id, type: String, null: false) do |scope, value|
      scope.joins(:makers).where("makers.uuid = ?", value)
    end
  end
end
