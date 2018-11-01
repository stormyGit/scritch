class CreateStatistics < ActiveRecord::Migration[5.2]
  def change
    create_table :statistics do |t|
      t.integer "users"
      t.integer "chats"
      t.integer "messages"
      t.integer "likes"
      t.integer "media"

      t.timestamps
    end
  end
end
