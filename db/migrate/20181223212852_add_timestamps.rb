class AddTimestamps < ActiveRecord::Migration[5.2]
  def change
    add_column :comment_reports, :created_at, :datetime, null: false
    add_column :comment_reports, :updated_at, :datetime, null: false

    add_column :medium_reports, :created_at, :datetime, null: false
    add_column :medium_reports, :updated_at, :datetime, null: false
  end
end
