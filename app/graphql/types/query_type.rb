module Types
  class QueryType < Types::BaseObject
    field :medium, MediumType, null: true do
      description "Find a medium by ID"
      argument :id, ID, required: true
    end

    field :media, [MediumType], null: false do
      description "List media"
    end

    def medium(id)
      Medium.find(id)
    end

    def media
      Medium.all
    end
  end
end
