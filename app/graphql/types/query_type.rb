module Types
  class QueryType < Types::BaseObject
    field :medium, MediumType, null: false do
      description "Find a medium by ID"
      argument :id, ID, required: true
    end

    field :media, [MediumType], null: false do
      description "List media"
      argument :q, String, required: false
      argument :sort, String, required: false
      argument :user_id, ID, required: false
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :likes_by_user, [LikeType], null: false do
      description "List likes by user"
      argument :user_id, ID, required: true
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :followers_by_user, [UserType], null: false do
      description "List followers by user"
      argument :user_id, ID, required: true
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :followings_by_user, [UserType], null: false do
      description "List followings by user"
      argument :user_id, ID, required: true
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :comments_by_medium, [CommentType], null: false do
      description "List comments by medium"
      argument :medium_id, ID, required: true
      argument :parent_id, ID, required: false
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :user, UserType, null: false do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    field :session, SessionType, null: true do
      description "Find current session"
    end

    def medium(params = {})
      Medium.includes(comments: [:user]).find(params[:id])
    end

    def media(params = {})
      media = Medium.where.not(key: nil).includes(:user)

      if params[:q].present?
        media = media.where("media.title @@ ?", params[:q])
      end

      if params[:sort] == 'latest'
        media = media.order(created_at: :desc)
      end

      if params[:user_id].present?
        media = media.where(user_id: params[:user_id])
      end

      media.page(params[:page]).per(params[:per])
    end

    def likes_by_user(params = {})
      Like.where(user_id: params[:user_id]).order(created_at: :desc).page(params[:page]).per(params[:per])
    end

    def followers_by_user(params = {})
      User.find(params[:user_id]).followers
    end

    def followings_by_user(params = {})
      User.find(params[:user_id]).all_following
    end

    def comments_by_medium(params = {})
      Comment.where(medium_id: params[:medium_id]).order(created_at: :desc).page(params[:page]).per(params[:per])
    end

    def user(params = {})
      User.find(params[:id])
    end

    def session(params = {})
      context[:current_session]
    end
  end
end
