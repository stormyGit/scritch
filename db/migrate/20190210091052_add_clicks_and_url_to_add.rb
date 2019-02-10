class AddClicksAndUrlToAdd < ActiveRecord::Migration[5.2]
  def change
    add_column :adverts, :url, :string
    add_column :adverts, :clicks, :integer, default: 0
  end
end
