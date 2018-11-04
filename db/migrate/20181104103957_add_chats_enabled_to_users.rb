class AddChatsEnabledToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :chat_enabled, :boolean, default: true
  end
end
