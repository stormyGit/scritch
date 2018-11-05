class AddSmallThumbnailKeyToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :small_thumbnail_key, :string
    remove_column :media, :thumbnail, :string
  end
end
