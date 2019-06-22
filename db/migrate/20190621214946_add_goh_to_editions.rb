class AddGohToEditions < ActiveRecord::Migration[5.2]
  def change
    add_column :editions, :guest_of_honours, :string, array: true
  end
end
