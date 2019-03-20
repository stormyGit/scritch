class CreateAssetRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :asset_requests do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :asset_type, null: false
      t.string :asset_name, null: false
      t.string :url, null: false
      t.string :body
      t.belongs_to :user, type: :uuid, index: true
      t.string "status", default: "new"
      t.bigint "assignee_id"
      t.index ["assignee_id"], name: "index_asset_requests_on_assignee_id"

      t.timestamps
    end
  end
end
