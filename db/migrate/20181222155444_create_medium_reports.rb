class CreateMediumReports < ActiveRecord::Migration[5.2]
  def change
    create_table :medium_reports do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.text "description"
      t.uuid "medium_id"
      t.uuid "reporter_id"
      t.string "status", default: "new"
      t.bigint "assignee_id"
      t.index ["assignee_id"], name: "index_medium_reports_on_assignee_id"
      t.index ["reporter_id"], name: "index_medium_reports_on_reporter_id"
      t.index ["medium_id"], name: "index_medium_reports_on_medium_id"
    end

    remove_column :reports, :resource
    rename_column :reports, :resource_id, :user_id
  end
end
