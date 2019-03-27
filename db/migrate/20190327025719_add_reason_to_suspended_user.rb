class AddReasonToSuspendedUser < ActiveRecord::Migration[5.2]
  def change
    add_column :suspended_users, :reason, :string
  end
end
