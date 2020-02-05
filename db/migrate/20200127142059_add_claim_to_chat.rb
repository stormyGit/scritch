class AddClaimToChat < ActiveRecord::Migration[5.2]
  def change
    add_column :chats, :case_id, :uuid
    add_column :chats, :case_type, :string
  end
end
