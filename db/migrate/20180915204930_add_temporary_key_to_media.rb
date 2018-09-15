class AddTemporaryKeyToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :temporary_key, :string
  end
end
