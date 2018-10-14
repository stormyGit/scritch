class AddRestrictionToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :restriction, :string, index: true, default: 'none'
  end
end
