include Resolvers::Queries::MakerQueries

module Types
  module Query
    MakerQuery = GraphQL::ObjectType.define do
      name 'MakerQuery'

      field :commissionStatuses, function: GetCommissionStatuses.new
      field :maker, function: GetMaker.new
      field :makersSelect, function: GetMakersSelect.new
      field :makers, function: GetMakers.new
      field :makersCountry, function: GetMakersCountry.new
      field :makersRegion, function: GetMakersRegion.new

    end
  end
end
