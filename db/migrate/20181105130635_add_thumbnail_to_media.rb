class AddThumbnailToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :thumbnail, :string
  end
end
