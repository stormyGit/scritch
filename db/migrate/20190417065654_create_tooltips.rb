class CreateTooltips < ActiveRecord::Migration[5.2]
  def change
    create_table :tooltips do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.boolean :public, default: false
      t.string :file
      t.string :category

      t.timestamps
    end
  end
end
