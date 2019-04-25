class AddKindToReports < ActiveRecord::Migration[5.2]
  def change
    add_column :tech_reports, :kind, :string
  end
end
