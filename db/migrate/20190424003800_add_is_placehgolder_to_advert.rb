class AddIsPlacehgolderToAdvert < ActiveRecord::Migration[5.2]
  def change
    add_column :adverts, :is_placeholder, :boolean, default: false
  end
end
