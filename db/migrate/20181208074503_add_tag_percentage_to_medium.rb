class AddTagPercentageToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :completion, :integer, default: 0
    add_column :media, :fursuits_count, :integer
  end
end
