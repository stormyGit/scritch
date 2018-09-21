class AddAvatarAndBannerToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :avatar, :string
    add_column :users, :banner, :string
  end
end
