class AddImpressionsToStats < ActiveRecord::Migration[5.2]
  def change
    add_column :statistics, :impressions, :integer
  end
end
