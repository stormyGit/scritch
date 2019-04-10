class AddStuffToEdition < ActiveRecord::Migration[5.2]
  def change
    add_column :editions, :theme, :string
    add_column :editions, :charity, :string
  end
end
