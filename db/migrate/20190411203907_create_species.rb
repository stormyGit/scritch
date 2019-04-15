class CreateSpecies < ActiveRecord::Migration[5.2]
  def change
    create_table :species do |t|
      t.uuid :uuid, default: -> { "uuid_generate_v4()" }
      t.string :name

      t.timestamps
    end

    remove_column :fursuit_species, :name
    remove_reference :fursuits, :fursuit_specy
    add_reference :fursuit_species, :fursuit, index: true, type: :uuid
    add_reference :fursuit_species, :specy, index: true, type: :uuid
    drop_table :hybrids
    drop_table :fursuit_specy_hybrids
  end
end
