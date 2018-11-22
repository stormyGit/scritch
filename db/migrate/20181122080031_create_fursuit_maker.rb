class CreateFursuitMaker < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_makers do |t|
      t.uuid :fursuit_id
      t.uuid :maker_id
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }, null: false
    end
  end
end
