class AddPublishedAtToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :published_at, :datetime
  end
end
