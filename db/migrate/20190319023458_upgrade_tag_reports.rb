class UpgradeTagReports < ActiveRecord::Migration[5.2]
  def change
    remove_reference :tag_reports, :fursuit_medium
    remove_reference :tag_reports, :user
    add_column :tag_reports, :description, :text
    add_column :tag_reports, :medium_id, :uuid
    add_column :tag_reports, :reporter_id, :uuid
    add_column :tag_reports, :status, :string, default: "new"
    add_column :tag_reports, :assignee_id, :bigint
    add_column :tag_reports, :fursuit_medium_ids, :uuid, array: true, default: []
    add_index :tag_reports, :assignee_id
    add_index :tag_reports, :reporter_id
    add_index :tag_reports, :medium_id
  end
end
