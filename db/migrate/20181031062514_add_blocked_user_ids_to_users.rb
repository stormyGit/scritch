class AddBlockedUserIdsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, "blocked_users_ids", :string, default: [], array: true
  end
end
