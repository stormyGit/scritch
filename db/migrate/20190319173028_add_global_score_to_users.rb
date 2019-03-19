class AddGlobalScoreToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :global_score, :integer, default: 0
    add_column :users, :metric_species, :string
  end
end
