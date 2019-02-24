class CreateFursuitSpecyHybrids < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_specy_hybrids do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :fursuit_specy, type: :uuid, null: false, index: true
      t.belongs_to :hybrid, type: :uuid, null: false, index: true

      t.timestamps
    end
  end
end
