class AddFursuitMediaRel < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :fursuit_id, :uuid
  end
end
