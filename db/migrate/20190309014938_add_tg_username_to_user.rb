class AddTgUsernameToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :telegram_username, :string
  end
end
