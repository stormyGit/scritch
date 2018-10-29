class CreateChats < ActiveRecord::Migration[5.2]
  def change
    create_table :chats do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.uuid "sender_id"
      t.uuid "recipient_id"
      t.datetime "accepted_at"
      t.boolean "is_sender_unread", default: false
      t.boolean "is_recipient_unread", default: true
      t.index ["recipient_id"], name: "index_chats_on_recipient_id"
      t.index ["sender_id"], name: "index_chats_on_sender_id"
      t.index ["uuid"], name: "index_chats_on_uuid", unique: true

      t.timestamps
    end
  end
end
