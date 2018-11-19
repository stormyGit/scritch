class CreateMakers < ActiveRecord::Migration[5.2]
  def change
    create_table :makers do |t|

    end
    add_column :makers, :name, :string
    add_column :makers, :web, :string
    add_column :makers, :country, :string
    add_column :makers, :slug, :string
    add_column :makers, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
  end
end
