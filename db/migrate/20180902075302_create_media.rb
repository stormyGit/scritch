class CreateMedia < ActiveRecord::Migration[5.2]
  def change
    create_table :media do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.string :title, null: false
      t.text :description
      t.belongs_to :user

      t.timestamps
    end
  end
end
