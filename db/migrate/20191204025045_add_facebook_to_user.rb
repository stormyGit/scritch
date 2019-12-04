class AddFacebookToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :service, :string, default: "telegram"
    add_column :users, :facebook_id, :string
    add_column :users, :facebook_email, :string
  end
end
