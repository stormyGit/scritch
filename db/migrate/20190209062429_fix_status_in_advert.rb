class FixStatusInAdvert < ActiveRecord::Migration[5.2]
  def change
    remove_column :adverts, :status, :string
    add_column :adverts, :status, :string, default: "pending"
  end
end
