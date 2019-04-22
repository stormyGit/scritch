class AddSubsNotifTimeToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :last_seen_media, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    add_column :users, :last_seen_fursuits, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
    add_column :users, :last_seen_makers, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
