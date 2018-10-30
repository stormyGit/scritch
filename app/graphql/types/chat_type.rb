module Types
  class ChatType < Types::BaseObject
    description "Chat object"
    field :id, ID, null: false
    field :sender, UserType, null: true
    field :contact, UserType, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
    field :is_unread, Boolean, null: false
    field :last_message, MessageType, null: true
    field :message, [MessageType], null: false

    def created_at
      object.created_at.iso8601
    end

    def updated_at
      object.updated_at.iso8601
    end

    def is_unread
      if (object.sender === context[:current_user] && object.is_sender_unread) || (object.recipient === context[:current_user] && object.is_recipient_unread)
        true
      else
        false
      end
    end

    def contact
      if object.sender === context[:current_user]
        object.recipient
      else
        object.sender
      end
    end
  end
end
