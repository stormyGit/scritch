class CreateAnnouncements < ActiveRecord::Migration[5.2]
  def change
    create_table :announcements do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.text :body
      t.timestamps
    end
  end
end
