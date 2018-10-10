class AddUuidToFollows < ActiveRecord::Migration[5.2]
  def change
    add_column :follows, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
  end
end
