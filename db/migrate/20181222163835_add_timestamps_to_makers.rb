class AddTimestampsToMakers < ActiveRecord::Migration[5.2]
  def change
    add_column :makers, :created_at, :datetime, null: false
    add_column :makers, :updated_at, :datetime, null: false
  end
end
