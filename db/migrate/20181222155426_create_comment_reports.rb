class CreateCommentReports < ActiveRecord::Migration[5.2]
  def change
    create_table :comment_reports do |t|
      t.uuid "uuid", default: -> { "uuid_generate_v4()" }
      t.text "description"
      t.uuid "comment_id"
      t.uuid "reporter_id"
      t.string "status", default: "new"
      t.bigint "assignee_id"
      t.index ["assignee_id"], name: "index_comment_reports_on_assignee_id"
      t.index ["reporter_id"], name: "index_comment_reports_on_reporter_id"
      t.index ["comment_id"], name: "index_comment_reports_on_comment_id"
    end
  end
end
