class AddSomeVideoMedatadaToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :duration, :integer
  end
end
