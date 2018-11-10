class AddWidthAndHeightToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :width, :integer
    add_column :media, :height, :integer
    add_column :media, :data, :json
    add_column :media, :exif, :json
    add_column :media, :size, :integer
  end
end
