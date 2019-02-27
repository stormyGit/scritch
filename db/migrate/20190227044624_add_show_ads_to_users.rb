class AddShowAdsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :show_ads, :boolean, default: true
    add_column :users, :show_tooltips, :boolean, default: true
  end
end
