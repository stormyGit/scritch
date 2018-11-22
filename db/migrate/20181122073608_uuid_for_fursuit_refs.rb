class UuidForFursuitRefs < ActiveRecord::Migration[5.2]
  def change
    remove_column :fursuits, :fursuit_leg_type_id
    remove_column :fursuits, :fursuit_style_id
    remove_column :fursuits, :fursuit_specy_id

    add_column :fursuits, :fursuit_leg_type_id, :uuid
    add_column :fursuits, :fursuit_style_id, :uuid
    add_column :fursuits, :fursuit_specy_id, :uuid
  end
end
