class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
      t.uuid "user_id"
      t.string :name
      t.timestamps
    end
  end
end
