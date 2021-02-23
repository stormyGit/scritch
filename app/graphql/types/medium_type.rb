module Types
  class MediumType < Types::BaseObject
    description "Medium object"
    field :id, ID, null: false
    field :slug, String, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :picture, String, null: false
    field :resized, String, null: false
    field :thumbnail, String, null: false
    field :width, Integer, null: true
    field :height, Integer, null: true
    field :exif, String, null: true
    field :fursuits_count, Integer, null: true
    field :completion, Integer, null: true
    field :created_at, String, null: true
    field :user, UserType, null: true
    field :comments, [CommentType], null: false
    field :tagger, ID, null: true
    field :tag_locked, Boolean, null: false

    field :photographer_slug, String, null: true
    field :photographer_string, String, null: true

    field :fursuits, [FursuitType], null: false

    field :edition_id, ID, null: true

    field :edition, EditionType, null: true
    field :sub_event, SubEventType, null: true
    field :category, CategoryType, null: true

    field :comments_count, Integer, null: false
    field :likes_count, Integer, null: false
    field :faves_count, Integer, null: false
    field :views_count, Integer, null: false

    field :liked, Boolean, null: false
    field :faved, Boolean, null: false

    field :comments_disabled, Boolean, null: false
    field :tag_list, [String], null: false

    def title
      object.uuid.split('-')[0]
    end

    def fursuits
      object.fursuits.order(:name)
    end

    def comments
      object.comments.order(created_at: :desc)
    end

    def liked
      context[:current_user].present? ? object.likers.find_by(uuid: context[:current_user].id).present? : false
    end

    def faved
      context[:current_user].present? ? object.favers.find_by(uuid: context[:current_user].id).present? : false
    end

    def exif
      object.exif.to_json.to_s #TODO a proprifier
    end

    def picture
      object.picture_url
    end

    def resized
      return object.picture_url(:resized)
    end

    def thumbnail
      object.picture_url(:thumbnail)
    end

    def square
      object.picture_url(:square)
    end

    def created_at
      object.created_at&.iso8601
    end

    def likes_count
      object.likes_count
    end

    def faves_count
      object.faves_count
    end

    def comments_count
      object.comments_count
    end

    def tag_list
      object.tags.map(&:name)
    end
  end
end
