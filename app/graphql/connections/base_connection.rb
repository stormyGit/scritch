class Connections::BaseConnection < GraphQL::Types::Relay::BaseConnection
  field :total_count, Integer, null: false
  field :total_page_count, Integer, null: false
  field :page_number, Integer, null: false

  def total_count
    object.nodes&.count
  end

  def total_page_count
    return 0 if object.arguments[:limit].to_f.zero?
    ((object.nodes&.count).to_f / object.arguments[:limit].to_f).ceil 
  end

  def page_number
    return 0 if object.arguments[:limit].to_f.zero?
    (object.arguments[:offset].to_f / object.arguments[:limit].to_f).ceil + 1
  end

  def nodes
    object.nodes&.limit(object.arguments[:limit]).offset(object.arguments[:offset])
  end
end
