class AddLastNotificationReadToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :last_activities_read, :datetime
  end
end
