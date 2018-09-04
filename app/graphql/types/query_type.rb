module Types
  class QueryType < Types::BaseObject
    field :medium, MediumType, null: false do
      description "Find a medium by ID"
      argument :id, ID, required: true
    end

    field :media, [MediumType], null: false do
      description "List media"
    end

    def medium(arguments)
      Medium.find(arguments[:id])
    end

    def media
      Medium.all
    end
  end
end
