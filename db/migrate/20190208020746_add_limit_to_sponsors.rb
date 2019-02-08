class AddLimitToSponsors < ActiveRecord::Migration[5.2]
  def change
    add_column :sponsors, :limit, :datetime
    add_column :sponsors, :plan, :string
    remove_column :sponsors, :user_id, :integer
    add_column :sponsors, :user_id, :uuid
  end
end
