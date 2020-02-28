class RemoveNilConditionTechReport < ActiveRecord::Migration[5.2]
  def change
    change_column :tech_reports, :user_id, :uuid, :null => true
  end
end
