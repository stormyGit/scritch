class CreateFursuitSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_subscriptions do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :fursuit, type: :uuid, index: :true
      t.belongs_to :user, type: :uuid, index: :true
      t.timestamps
    end
  end
end
