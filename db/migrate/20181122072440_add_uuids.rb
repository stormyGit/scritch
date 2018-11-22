class AddUuids < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuit_leg_types, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
    add_column :fursuit_styles, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false
    add_column :fursuit_species, :uuid, :uuid, default: -> { "uuid_generate_v4()" }, null: false

  end
end
