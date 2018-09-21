class AddTelegramInfoToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :telegram_id, :string
    remove_column :users, :password_digest, :string
  end
end
