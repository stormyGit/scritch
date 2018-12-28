class Statistics < ActiveRecord::Migration[5.2]
  def change
    remove_column :statistics, :chats
    remove_column :statistics, :messages
  end
end
