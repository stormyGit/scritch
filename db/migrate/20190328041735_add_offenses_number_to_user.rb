class AddOffensesNumberToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :offenses_number, :integer, default: 0
  end
end
