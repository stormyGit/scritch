module Types
  class AnnouncementType < Types::BaseObject
    description "Announcement object"
    field :id, ID, null: false
    field :body, String, null: false
    field :created_at, String, null: false
    field :sender, UserType, null: false

    def created_at
      object.created_at.iso8601
    end

    def sender
      User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"])
    end
  end
end
