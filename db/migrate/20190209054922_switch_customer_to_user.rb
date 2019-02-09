class SwitchCustomerToUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :adverts, :customer, :json
    remove_column :adverts, :charge, :json
    remove_column :adverts, :status, :boolean
    add_column :adverts, :status, :string
    add_column :users, :customer, :json
    add_column :users, :charge, :json
    add_column :users, :available_impressions, :integer, default: 0
    add_column :adverts, :public, :boolean, default: false
  end
end
