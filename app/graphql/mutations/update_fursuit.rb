class Mutations::UpdateFursuit < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :name, String, required: true
  argument :maker_ids, [ID], required: false
  argument :creation_year, Integer, required: false
  argument :fursuit_leg_type_id, ID, required: false
  argument :fursuit_style_id, ID, required: false
  argument :fursuit_padding_id, ID, required: false
  argument :fursuit_build_id, ID, required: false
  argument :fursuit_gender_id, ID, required: false
  argument :fursuit_finger_id, ID, required: false
  argument :is_hybrid, Boolean, required: false
  argument :fursuit_specy_id, ID, required: false
  argument :hybrid_species, [ID, null: true], required: false
  argument :avatar, String, required: false
  argument :base_color, String, required: false
  argument :eyes_color, String, required: false

  field :fursuit, Types::FursuitType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    puts "\n" * 30
    puts "UPDATE FURSUIT\n\n"
    puts arguments
    puts "\n" * 30
    fursuit = Fursuit.find(arguments[:id])
    if arguments[:is_hybrid] != fursuit.is_hybrid
      if arguments[:is_hybrid] == false && fursuit.is_hybrid == true
        fursuit.hybrid.destroy
        fursuit.is_hybrid = false
      elsif arguments[:is_hybrid] == true && fursuit.is_hybrid == false
        Hybrid.create!(fursuit: fursuit)
        fursuit.fursuit_specy_id = nil
        fursuit.is_hybrid = true
      end
    end
    if arguments[:hybrid_species].present?
      fursuit.hybrid.update!(fursuit_specy_ids: arguments[:hybrid_species])
    end
    fursuit.assign_attributes(arguments.except(:fursuit_species, :is_hybrid, :hybrid_species))

    raise Pundit::NotAuthorizedError unless FursuitPolicy.new(context[:current_user], fursuit).update?

    if fursuit.save
      {
        fursuit: fursuit,
        errors: [],
      }
    else
      {
        fursuit: fursuit,
        errors: fursuit.errors.full_messages
      }
    end
  end
end
