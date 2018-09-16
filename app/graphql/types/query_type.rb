module Types
  class QueryType < Types::BaseObject
    field :medium, MediumType, null: false do
      description "Find a medium by ID"
      argument :id, ID, required: true
    end

    field :media, [MediumType], null: false do
      description "List media"
      argument :q, String, required: false
    end

    def medium(params = {})
      Medium.find(params[:id])
    end

    def media(params = {})
      medium = Medium.where.not(key: nil)

      if params[:q].present?
        medium = medium.where("media.title @@ ?", params[:q])
      end

      medium
    end
  end
end
