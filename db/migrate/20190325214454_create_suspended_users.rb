class CreateSuspendedUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :suspended_users do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :user, type: :uuid, null: false, index: true
      t.datetime :limit

      t.timestamps
    end

    add_column :users, :suspension_count, :integer, default: 0
  end
end
