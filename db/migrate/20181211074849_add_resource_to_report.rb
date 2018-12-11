class AddResourceToReport < ActiveRecord::Migration[5.2]
  def change
    add_column :reports, :resource, :string
    rename_column :reports, :user_id, :resource_id
  end
end
