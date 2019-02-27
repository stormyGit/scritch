class MakeItBetterInFursuitMedia < ActiveRecord::Migration[5.2]
  def change
    remove_column :fursuit_media, :fursuit_id, :uuid
    remove_column :fursuit_media, :medium_id, :uuid
    add_reference :fursuit_media, :fursuit, type: :uuid, index: true
    add_reference :fursuit_media, :medium, type: :uuid, index: true
    add_reference :fursuit_media, :user, type: :uuid, index: true
  end
end
