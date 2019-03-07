class CreateTagReports < ActiveRecord::Migration[5.2]
  def change
    create_table :tag_reports do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :fursuit_medium, type: :uuid, null: false, index: true
      t.belongs_to :user, type: :uuid, null: false, index: true

      t.timestamps
    end
  end
end
