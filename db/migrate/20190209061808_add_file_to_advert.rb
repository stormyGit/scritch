class AddFileToAdvert < ActiveRecord::Migration[5.2]
  def change
    add_column :adverts, :file, :string
  end
end
