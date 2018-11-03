class AddLastAnnouncementsReadToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :last_announcements_read, :datetime
  end
end
