class AddBioToFursuits < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuits, :bio, :string
  end
end
