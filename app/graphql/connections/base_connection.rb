class Connections::BaseConnection < GraphQL::Types::Relay::BaseConnection
  field :total_count, Integer, null: false
  field :end_cursor, String, null: false
  field :start_cursor, String, null: false

  def total_count
    object.nodes.count
  end
end
