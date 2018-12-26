class CreateFursuitMedia < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_media do |t|
      t.uuid :medium_id
      t.uuid :fursuit_id

      t.timestamps
    end

    add_column :fursuit_media, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
  end
end
