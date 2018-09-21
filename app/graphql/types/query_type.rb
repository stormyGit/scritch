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

    field :user, UserType, null: false do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    field :session, SessionType, null: true do
      description "Find current session"
    end

    def medium(params = {})
      Medium.find(params[:id])
    end

    def media(params = {})
      medium = Medium.joins(:video_encoding_job).where("chronofage_jobs.completed_at IS NOT NULL AND chronofage_jobs.failed_at IS NULL")

      if params[:q].present?
        medium = medium.where("media.title @@ ?", params[:q])
      end

      medium
    end

    def user(params = {})
      User.find(params[:id])
    end

    def session(params = {})
      context[:current_session]
    end
  end
end
