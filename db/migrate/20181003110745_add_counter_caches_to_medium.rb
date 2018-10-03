class AddCounterCachesToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :comments_count, :integer, default: 0
    add_column :media, :likes_count, :integer, default: 0
  end
end
