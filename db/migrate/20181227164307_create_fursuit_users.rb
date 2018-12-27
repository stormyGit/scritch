class CreateFursuitUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_users do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.uuid :user_id
      t.uuid :fursuit_id

      t.timestamps
    end
  end
end
