class AddWebToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :web, :string
  end
end
