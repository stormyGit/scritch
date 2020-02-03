module Types
  class ChartDataType < Types::BaseObject
    description "Chart Data object"

    field :amount, Integer, null: false
    field :date, Integer, null: false

  end
end
