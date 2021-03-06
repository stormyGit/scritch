module Types
  class AnnouncementType < Types::BaseObject
    description "Announcement object"
    field :id, ID, null: false
    field :body, String, null: false
    field :title, String, null: false
    field :created_at, String, null: false
    field :sender, UserType, null: true #TODO

    def created_at
      object.created_at.iso8601
    end

    def sender
      User.find_by(telegram_id: ENV["MODERATOR_TELEGRAM_ID"])
    end
  end
end
