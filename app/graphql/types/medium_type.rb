module Types
  class MediumType < Types::BaseObject
    description "Medium object"
    field :id, ID, null: false
    field :slug, String, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :key, String, null: true
    field :thumbnail_key, String, null: true
    field :small_thumbnail_key, String, null: true
    field :preview_key, String, null: true
    field :temporary_key, String, null: false
    field :duration, Integer, null: true
    field :published_at, String, null: true
    field :user, UserType, null: true
    field :comments, [CommentType], null: false
    field :related_media, [MediumType], null: false

    field :comments_count, Integer, null: false
    field :likes_count, Integer, null: false
    field :views_count, Integer, null: false

    field :liked, Boolean, null: false
    field :comments_disabled, Boolean, null: false
    field :tag_list, [String], null: false
    field :visibility, String, null: false
    field :restriction, String, null: false

    def comments
      object.comments.order(created_at: :desc)
    end

    def liked
      context[:current_user].present? ? object.likers.find_by(uuid: context[:current_user].id).present? : false
    end

    def related_media
      limit = 10

      MediumPolicy::Scope.new(context[:current_user], Medium.tagged_with(object.tag_list, any: true).where.not(uuid: object.uuid).published).resolve.limit(limit).to_a.tap do |media|
        if media.count < limit
          media.concat MediumPolicy::Scope.new(context[:current_user], Medium.published).resolve.order("RANDOM()").where.not(uuid: [object.uuid] + media.map(&:uuid)).limit(limit - media.count).to_a
        end
      end
    end

    def published_at
      object.published_at&.iso8601
    end

    def likes_count
      object.likes_count
    end

    def comments_count
      object.comments_count
    end

    def tag_list
      object.tags.map(&:name)
    end
  end
end
