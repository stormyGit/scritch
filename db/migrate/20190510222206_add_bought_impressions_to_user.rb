class AddBoughtImpressionsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :bought_impressions, :integer, default: 0
  end
end
