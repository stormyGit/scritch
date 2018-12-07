class CreatePanels < ActiveRecord::Migration[5.2]
  def change
    create_table :panels do |t|
      t.string :name
      t.uuid :edition_id

      t.timestamps
    end

    add_column :panels, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
    add_column :media, :panel_id, :uuid
  end
end
