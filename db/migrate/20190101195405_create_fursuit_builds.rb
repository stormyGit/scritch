class CreateFursuitBuilds < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_builds do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :name

      t.timestamps
    end
  end
end
