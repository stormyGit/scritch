module Types
  class EventType < Types::BaseObject
    description "Event object"
    field :id, ID, null: false
    field :name, String, null: false
    field :status, String, null: false
    field :web, String, null: false
    field :country, String, null: false
    field :avatar, String, null: true
    field :slug, String, null: false
    field :editions, [EditionType], null: false

    def country
      if object.editions.present?
        object.editions.order("editions.year DESC").first.country
      else
        "Unknown"
      end
    end

    def avatar
      object.avatar_url(:thumbnail)
    end
  end
end
