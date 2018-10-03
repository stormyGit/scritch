class AddCommentsDisabledToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :comments_disabled, :boolean, default: false
  end
end
