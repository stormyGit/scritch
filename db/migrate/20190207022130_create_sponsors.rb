class CreateSponsors < ActiveRecord::Migration[5.2]
  def change
    create_table :sponsors do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.json :customer
      t.json :charge
      t.belongs_to :user

      t.timestamps
    end
  end
end
