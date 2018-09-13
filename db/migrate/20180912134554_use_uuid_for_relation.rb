class UseUuidForRelation < ActiveRecord::Migration[5.2]
  def change
    remove_column :media, :user_id
    add_column :media, :user_id, :uuid
  end
end
