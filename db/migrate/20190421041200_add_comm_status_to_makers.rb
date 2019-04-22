class AddCommStatusToMakers < ActiveRecord::Migration[5.2]
  def change
    add_column :makers, :commission_status, :string, default: "N/A"
  end
end
