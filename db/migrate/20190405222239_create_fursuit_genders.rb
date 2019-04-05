class CreateFursuitGenders < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_genders do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :name

      t.timestamps
    end

    add_reference :fursuits, :fursuit_gender, type: :uuid, index: true
  end
end
