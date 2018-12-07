class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name

      t.timestamps
    end

    add_column :categories, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
    add_column :media, :category_id, :uuid
  end
end
