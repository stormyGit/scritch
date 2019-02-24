class AddHybridToFursuit < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuits, :is_hybrid, :boolean
  end
end
