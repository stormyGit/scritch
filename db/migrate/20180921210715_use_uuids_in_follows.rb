class UseUuidsInFollows < ActiveRecord::Migration[5.2]
  def change
    remove_column :follows, :followable_id
    add_column :follows, :followable_id, :uuid

    remove_column :follows, :follower_id
    add_column :follows, :follower_id, :uuid
  end
end
