class RemoveTaggerRequirement < ActiveRecord::Migration[5.2]
  def change
    change_column :taggings, :tagger_id, :uuid, null: true
    change_column :taggings, :tagger_type, :string, null: true
  end
end
