class AddStuffToTooltips < ActiveRecord::Migration[5.2]
  def change
    add_column :tooltips, :name, :string
    add_column :tooltips, :body, :string
    add_column :tooltips, :aspect, :string
    add_column :tooltips, :topic, :string
  end
end
