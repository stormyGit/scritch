module Types
  class EditionType < Types::BaseObject
    description "Edition object"
    field :id, ID, null: false
    field :name, String, null: false
    field :slug, String, null: false
    field :event, EventType, null: true
    field :country, String, null: false
    field :city, String, null: false
    field :guest_of_honours, [String], null: true
    field :kind, String, null: false
    field :venue, String, null: true
    field :attendance, Integer, null: true
    field :venue, String, null: true
    field :theme, String, null: true
    field :charity, String, null: true
    field :year, Integer, null: false
    field :start_date, String, null: false
    field :end_date, String, null: false
    field :event, EventType, null: true
  end

end
