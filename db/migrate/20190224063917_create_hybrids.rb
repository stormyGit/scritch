class CreateHybrids < ActiveRecord::Migration[5.2]
  def change
    create_table :hybrids do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :fursuit, type: :uuid, null: false, index: true

      t.timestamps
    end
  end
end
