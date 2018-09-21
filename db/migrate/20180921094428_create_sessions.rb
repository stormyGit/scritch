class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
      t.uuid "user_id", index: true

      t.timestamps
    end
  end
end
