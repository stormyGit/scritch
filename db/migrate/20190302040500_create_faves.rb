class CreateFaves < ActiveRecord::Migration[5.2]
  def change
    create_table :faves do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :medium, type: :uuid, null: false, index: true
      t.belongs_to :user, type: :uuid, null: false, index: true

      t.timestamps
    end

    add_column :media, :faves_count, :integer, default: 0
  end
end
