class CreateBannedUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :banned_users do |t|
      t.string "telegram_id"
      t.text "ban_reason"
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.string "notification_message"
      t.datetime "banned_until"
      t.json "user_attributes", default: {}
      t.uuid "user_id"
      t.index ["telegram_id"], name: "index_banned_users_on_telegram_id"

      t.timestamps
    end
  end
end
