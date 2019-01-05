class CreateFursuitFingers < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_fingers do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :name

      t.timestamps
    end

    add_column :fursuits, :fursuit_padding_id, :uuid
    add_column :fursuits, :fursuit_build_id, :uuid
    add_column :fursuits, :fursuit_finger_id, :uuid
    add_column :fursuits, :base_color, :string
    add_column :fursuits, :eyes_color, :string
  end
end
