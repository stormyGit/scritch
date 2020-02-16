module Types
  class MessageType < Types::BaseObject
    description "Message object"
    field :id, ID, null: false
    field :body, String, null: false
    field :picture, String, null: true
    field :sender_id, ID, null: false
    field :created_at, String, null: false

    def picture
      object.picture_url
    end
    
    def created_at
      object.created_at.iso8601
    end
  end
end
