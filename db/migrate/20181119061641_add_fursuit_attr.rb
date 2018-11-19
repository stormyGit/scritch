class AddFursuitAttr < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuits, :name, :string
    add_column :fursuits, :slug, :string
    add_column :fursuits, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
  end
end
