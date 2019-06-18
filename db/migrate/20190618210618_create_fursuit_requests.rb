class CreateFursuitRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_requests do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
      t.string "name"
      t.integer "creation_year"
      t.uuid "fursuit_leg_type_id"
      t.uuid "fursuit_style_id"
      t.uuid "fursuit_padding_id"
      t.uuid "fursuit_build_id"
      t.uuid "fursuit_finger_id"
      t.uuid "fursuit_gender_id"
      t.uuid "maker_ids", array: true
      t.string "base_color"
      t.string "eyes_color"
      t.string "url"
      t.string "notes"
      t.uuid "species_ids", array: true
      t.boolean "is_hybrid", default: false
      t.belongs_to :user, type: :uuid, index: true

      t.timestamps
    end
  end
end
