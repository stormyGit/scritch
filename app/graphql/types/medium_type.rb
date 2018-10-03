module Types
  class MediumType < Types::BaseObject
    description "Medium object"
    field :id, ID, null: false
    field :slug, String, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :key, String, null: true
    field :thumbnail_key, String, null: true
    field :preview_key, String, null: true
    field :temporary_key, String, null: false
    field :duration, Integer, null: false
    field :createdAt, String, null: false
    field :updatedAt, String, null: false
    field :user, UserType, null: true
    field :comments, [CommentType], null: false
    field :related_media, [MediumType], null: false
    field :comments_count, Integer, null: false
    field :likers_count, Integer, null: false
    field :liked, Boolean, null: false
    field :views_count, Integer, null: false

    def comments
      object.comments.order(created_at: :desc)
    end

    def comments_count
      object.comments.count
    end

    def likers_count
      object.likers.count
    end

    def liked
      context[:current_user].present? ? object.likers.find_by(uuid: context[:current_user].id).present? : false
    end
  end
end
