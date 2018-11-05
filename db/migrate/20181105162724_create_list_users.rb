class CreateListUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :lists_users do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
      t.uuid "user_id"
      t.uuid "list_id"
      t.timestamps
    end
  end
end
