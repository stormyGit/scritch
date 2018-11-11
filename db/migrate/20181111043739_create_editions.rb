class CreateEditions < ActiveRecord::Migration[5.2]
  def change
    create_table :editions do |t|
      t.datetime "start_date"
      t.datetime "end_date"
      t.string "country"
      t.string "city"
      t.string "kind"
      t.integer "year"
      t.string "name"
      t.uuid "event_id"
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.string "venue"
      t.integer "attendance"
      t.string "slug"

      t.index "to_tsvector('english'::regconfig, (name)::text)", name: "index_editions_on_name", using: :gin

      t.timestamps
    end
  end
end
