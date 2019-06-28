class AddDefaultToFursuitCountInMedia < ActiveRecord::Migration[5.2]
  def change
    change_column_default :media, :fursuits_count, 0
  end
end
