class AddTrialToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :used_free_trial, :boolean, default: false
  end
end
