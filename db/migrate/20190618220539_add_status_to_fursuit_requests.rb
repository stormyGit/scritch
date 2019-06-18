class AddStatusToFursuitRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuit_requests, :status, :string, default: "new"
    add_column :fursuit_requests, :assignee_id, :bigint
  end
end
