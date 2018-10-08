class CreateViews < ActiveRecord::Migration[5.2]
  def change
    enable_extension :hstore
    create_table :views do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false

      t.string :ip, index: true
      t.uuid :user_id, index: true
      t.uuid :medium_id, index: true
      t.timestamps
    end
  end
end
