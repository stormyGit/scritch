class AddRefusedAtToMedia < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :refused_at, :datetime
  end
end
