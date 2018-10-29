class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.uuid "chat_id"
      t.uuid "sender_id"
      t.string "body"
      t.string "picture"
      t.index ["chat_id"], name: "index_messages_on_chat_id"
      t.index ["created_at"], name: "index_messages_on_created_at"
      t.index ["sender_id"], name: "index_messages_on_sender_id"
      t.index ["uuid"], name: "index_messages_on_uuid", unique: true

      t.timestamps
    end
  end
end
