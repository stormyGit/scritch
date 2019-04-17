class TagLockOnMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :tag_locked, :boolean, default: false
    add_column :media, :tagger, :uuid, default: false
    add_column :media, :tag_lock_data, :datetime
  end
end
