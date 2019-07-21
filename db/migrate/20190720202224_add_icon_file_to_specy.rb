class AddIconFileToSpecy < ActiveRecord::Migration[5.2]
  def change
    add_column :species, :avatar_file, :string
  end
end
