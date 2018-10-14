class AddVisibilityToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :visibility, :string, index: true, default: 'public'
  end
end
