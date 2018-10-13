class AddIndexToUserName < ActiveRecord::Migration[5.2]
  def change
    enable_extension "pg_trgm"

    add_index :users, ["name"], name: "index_users_on_name", opclass: :gin_trgm_ops, using: :gin
  end
end
