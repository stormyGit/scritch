class CreateSubEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :sub_events do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :name, required: true
      t.belongs_to :edition, type: :uuid, null: false, index: true

      t.timestamps
    end

    add_column :media, :sub_event_id, :uuid, optional: true
  end
end
