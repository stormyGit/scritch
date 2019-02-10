class AddChargeStuffToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :charge_id, :string
    add_column :users, :customer_id, :string
  end
end
