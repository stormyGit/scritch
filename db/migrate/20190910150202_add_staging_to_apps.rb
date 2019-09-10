class AddStagingToApps < ActiveRecord::Migration[5.2]
  def change
    add_column :apps, :staging, :boolean, default: false
  end
end
