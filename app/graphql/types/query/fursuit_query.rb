include Resolvers::Queries::FursuitQueries

module Types
  module Query
    FursuitQuery = GraphQL::ObjectType.define do
      name 'FursuitQuery'

      field :fursuit, function: GetFursuit.new
      field :fursuits, function: GetFursuits.new

      field :fursuitLegTypes, function: GetFursuitLegTypes.new
      field :fursuitStyles, function: GetFursuitStyles.new
      field :fursuitGenders, function: GetFursuitGenders.new
      field :fursuitFingers, function: GetFursuitFingers.new
      field :fursuitBuilds, function: GetFursuitBuilds.new
      field :fursuitPaddings, function: GetFursuitPaddings.new
      field :species, function: GetSpecies.new
      field :hybridSpecies, function: GetHybridSpecies.new

    end
  end
end
