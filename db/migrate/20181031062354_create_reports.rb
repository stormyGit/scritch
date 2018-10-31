class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.text "description"
      t.uuid "user_id"
      t.uuid "reporter_id"
      t.string "status", default: "new"
      t.bigint "assignee_id"
      t.index ["assignee_id"], name: "index_reports_on_assignee_id"
      t.index ["reporter_id"], name: "index_reports_on_reporter_id"
      t.index ["user_id"], name: "index_reports_on_user_id"
      t.timestamps
    end
  end
end
