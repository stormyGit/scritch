class CreateFursuitAndAttributes < ActiveRecord::Migration[5.2]
  def change
    create_table :fursuit_species do |t|
      t.string :name

      t.timestamps
    end

    create_table :fursuit_leg_types do |t|
      t.string :name

      t.timestamps
    end

    create_table :fursuit_styles do |t|
      t.string :name

      t.timestamps
    end

    add_reference :fursuits, :fursuit_style, index: true
    add_reference :fursuits, :fursuit_specy, index: true
    add_reference :fursuits, :fursuit_leg_type, index: true
  end
end
