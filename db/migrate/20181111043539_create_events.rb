class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string "name"
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.string "slug"
      t.index "to_tsvector('english'::regconfig, (name)::text)", name: "index_events_on_name", using: :gin

      t.timestamps
    end
  end
end
