module Types
  class ChatType < Types::BaseObject
    description "Chat object"
    field :id, ID, null: false
    field :sender, UserType, null: true
    field :recipient, UserType, null: false
    field :sender, UserType, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
    field :is_sender_unread, Boolean, null: false
    field :is_recipient_unread, Boolean, null: false
    field :last_message, MessageType, null: true
    field :message, [MessageType], null: false

    def created_at
      object.created_at.iso8601
    end

    def updated_at
      object.updated_at.iso8601
    end
  end
end
