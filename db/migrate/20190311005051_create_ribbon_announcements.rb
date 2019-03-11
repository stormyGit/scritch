class CreateRibbonAnnouncements < ActiveRecord::Migration[5.2]
  def change
    create_table :ribbon_announcements do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :body, null: false
      t.boolean :public, null: false, default: false

      t.timestamps
    end
  end
end
