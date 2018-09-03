require 'types/mutation_type'

class MurrsuitSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
