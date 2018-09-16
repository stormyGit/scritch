class AddSlugToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :slug, :string, index: true
  end
end
