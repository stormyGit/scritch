class AddPhotographerDataToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :photographer_slug, :string
    add_column :media, :photographer_string, :string
  end
end
