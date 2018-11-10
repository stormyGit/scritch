class AddPictureToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :picture, :string
  end
end
