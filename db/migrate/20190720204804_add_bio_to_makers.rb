class AddBioToMakers < ActiveRecord::Migration[5.2]
  def change
    add_column :makers, :bio, :string
  end
end
