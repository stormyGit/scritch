class FixUserInAdvert < ActiveRecord::Migration[5.2]
  def change
    remove_column :adverts, :user_id, :bigint
    add_column :adverts, :user_id, :uuid
  end
end
