class AddSlugToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :slug, :string, index: true
  end
end
