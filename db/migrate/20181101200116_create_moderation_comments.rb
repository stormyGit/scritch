class CreateModerationComments < ActiveRecord::Migration[5.2]
  def change
    create_table :moderation_comments do |t|
      t.uuid "subject_id"
      t.string "subject_type"
      t.text "body"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.bigint "moderator_id"
      t.index ["moderator_id"], name: "index_moderation_comments_on_moderator_id"
      t.index ["subject_id"], name: "index_moderation_comments_on_subject_id"
    end
  end
end
