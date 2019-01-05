class CreateFursuitPaddings < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_paddings do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :name

      t.timestamps
    end
  end
end
