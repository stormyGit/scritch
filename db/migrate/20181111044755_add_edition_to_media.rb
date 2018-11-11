class AddEditionToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :edition_id, :uuid
  end
end
