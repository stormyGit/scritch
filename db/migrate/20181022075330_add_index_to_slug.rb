class AddIndexToSlug < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :slug, unique: true
    add_index :media, :slug, unique: true
  end
end
