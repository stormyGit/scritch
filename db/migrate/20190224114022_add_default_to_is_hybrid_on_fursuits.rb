class AddDefaultToIsHybridOnFursuits < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:fursuits, :is_hybrid, false)
  end
end
