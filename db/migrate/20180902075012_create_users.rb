class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    enable_extension "uuid-ossp"
    
    create_table :users do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.string :name, null: false

      t.timestamps
    end
  end
end
