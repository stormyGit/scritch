class RemoveUselessFieldsOnMedia < ActiveRecord::Migration[5.2]
  def change
    remove_column :media, :video_encoding_job_id
    remove_column :media, :key
    remove_column :media, :temporary_key
    remove_column :media, :thumbnail_key
    remove_column :media, :preview_key
    remove_column :media, :visibility
    remove_column :media, :restriction
    remove_column :media, :published_at
  end
end
