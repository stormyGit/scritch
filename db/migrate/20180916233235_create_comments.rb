class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
      t.uuid :user_id
      t.uuid :medium_id
      t.text :body
      t.timestamps
    end
  end
end
