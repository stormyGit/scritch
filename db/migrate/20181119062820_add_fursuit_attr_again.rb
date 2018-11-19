class AddFursuitAttrAgain < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuits, :creation_year, :integer
  end
end
