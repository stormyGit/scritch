class CreateClaims < ActiveRecord::Migration[5.2]
  def change
    create_table :claims do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.belongs_to :fursuit, type: :uuid, null: false, index: true
      t.belongs_to :user, type: :uuid, null: false, index: true

      t.string :status, null: false, default: "open"
      t.boolean :conflictual, default: false
      
      t.timestamps
    end
  end
end
