class CreateFursuits < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuits do |t|

      t.timestamps
    end
  end
end
