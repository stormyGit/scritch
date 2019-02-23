class AddRegionToMakers < ActiveRecord::Migration[5.2]
  def change
    add_column :makers, :region, :string
  end
end
