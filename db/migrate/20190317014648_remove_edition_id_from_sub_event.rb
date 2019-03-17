class RemoveEditionIdFromSubEvent < ActiveRecord::Migration[5.2]
  def change
    remove_reference :sub_events, :edition
  end
end
