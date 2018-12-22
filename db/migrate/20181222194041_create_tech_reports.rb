class CreateTechReports < ActiveRecord::Migration[5.2]
  def change
    create_table :tech_reports do |t|
      t.string :page
      t.text :description
      t.uuid :user_id
      t.timestamps
    end
  end
end
