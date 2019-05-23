class AddVisibilityToMakers < ActiveRecord::Migration[5.2]
  def change
    add_column :makers, :visible, :boolean, default: true
    add_column :fursuits, :visible, :boolean, default: true
  end
end
