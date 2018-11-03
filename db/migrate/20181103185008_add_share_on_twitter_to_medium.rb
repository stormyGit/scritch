class AddShareOnTwitterToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :share_on_twitter, :boolean, default: true
  end
end
