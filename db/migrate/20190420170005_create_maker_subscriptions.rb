class CreateMakerSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :maker_subscriptions do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :maker, type: :uuid, index: :true
      t.belongs_to :user, type: :uuid, index: :true
      t.timestamps
    end
  end
end
