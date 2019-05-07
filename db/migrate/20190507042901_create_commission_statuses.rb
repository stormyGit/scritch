class CreateCommissionStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :commission_statuses do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :name

      t.timestamps
    end

    add_reference :makers, :commission_status, type: :uuid, index: true
  end
end
