class AddTitleToAnnouncements < ActiveRecord::Migration[5.2]
  def change
    add_column :announcements, :title, :string
  end
end
