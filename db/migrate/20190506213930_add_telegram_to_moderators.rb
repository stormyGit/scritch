class AddTelegramToModerators < ActiveRecord::Migration[5.2]
  def change
    add_column :moderators, :telegram_id, :string
    add_column :moderators, :telegram_username, :string
  end
end
