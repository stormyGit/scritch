class AddStuffToStatistics < ActiveRecord::Migration[5.2]
  def change
    add_column :statistics, :tags, :integer, default: 0
    add_column :statistics, :claimed_suits, :integer, default: 0
    add_column :statistics, :claimed_makers, :integer, default: 0
    add_column :statistics, :sponsors, :integer, default: 0
    add_column :statistics, :faves, :integer, default: 0
    add_column :statistics, :comments, :integer, default: 0
    add_column :statistics, :average_completion, :float, default: 0
  end
end
