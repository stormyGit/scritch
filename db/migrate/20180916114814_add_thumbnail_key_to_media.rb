class AddThumbnailKeyToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :thumbnail_key, :string
    add_column :media, :preview_key, :string
  end
end
