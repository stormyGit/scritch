class AddPicturesToAttributes < ActiveRecord::Migration[5.2]
  def change
    add_column :fursuit_leg_types, :picture, :string
    add_column :fursuit_genders, :picture, :string
    add_column :fursuit_builds, :picture, :string
    add_column :fursuit_paddings, :picture, :string
    add_column :fursuit_styles, :picture, :string
  end
end
