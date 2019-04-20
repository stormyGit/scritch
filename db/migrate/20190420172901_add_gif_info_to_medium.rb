class AddGifInfoToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :is_gif, :boolean, default: false
  end
end
