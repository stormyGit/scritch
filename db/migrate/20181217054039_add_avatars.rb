class AddAvatars < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuits, :avatar, :string
    add_column :makers, :avatar, :string
    add_column :events, :avatar, :string
  end
end
