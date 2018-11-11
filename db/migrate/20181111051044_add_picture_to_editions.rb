class AddPictureToEditions < ActiveRecord::Migration[5.2]
  def change
    add_column :editions, :picture, :string
  end
end
