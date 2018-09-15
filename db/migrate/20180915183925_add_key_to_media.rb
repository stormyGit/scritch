class AddKeyToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :key, :string
  end
end
