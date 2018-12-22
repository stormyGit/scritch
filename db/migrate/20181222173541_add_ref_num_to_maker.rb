class AddRefNumToMaker < ActiveRecord::Migration[5.2]
  def change
    add_column :makers, :reference, :integer
  end
end
