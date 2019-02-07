class AddStatusToSponsor < ActiveRecord::Migration[5.2]
  def change
    add_column :sponsors, :status, :string
    add_column :sponsors, :charge_id, :string
    add_column :sponsors, :customer_id, :string
  end
end
