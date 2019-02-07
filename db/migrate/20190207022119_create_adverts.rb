class CreateAdverts < ActiveRecord::Migration[5.2]
  def change
    create_table :adverts do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.integer :width
      t.integer :height
      t.integer :size
      t.json :customer
      t.json :charge
      t.integer :impressions, default: 0
      t.boolean :status, default: "pending"
      t.belongs_to :user

      t.timestamps
    end
  end
end
