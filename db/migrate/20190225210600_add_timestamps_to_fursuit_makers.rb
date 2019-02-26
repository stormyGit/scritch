class AddTimestampsToFursuitMakers < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuit_makers, :created_at, :datetime, null: false
    add_column :fursuit_makers, :updated_at, :datetime, null: false
  end
end
