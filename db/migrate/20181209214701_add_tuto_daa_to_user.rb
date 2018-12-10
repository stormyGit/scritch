class AddTutoDaaToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :tag_tutorial, :boolean, default: true
  end
end
