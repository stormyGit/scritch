class Mutations::CreateFursuit < Mutations::BaseMutation
  argument :visible, Boolean, required: true
  argument :name, String, required: true
  argument :bio, String, required: false
  argument :slug, String, required: true
  argument :maker_ids, [ID], required: false
  argument :creation_year, Integer, required: false
  argument :fursuit_leg_type_id, ID, required: false
  argument :fursuit_style_id, ID, required: false
  argument :fursuit_padding_id, ID, required: false
  argument :fursuit_build_id, ID, required: false
  argument :fursuit_gender_id, ID, required: false
  argument :fursuit_finger_id, ID, required: false
  argument :is_hybrid, Boolean, required: false
  argument :species_ids, [ID], required: false
  argument :base_color, String, required: false
  argument :eyes_color, String, required: false

  field :fursuit, Types::FursuitType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    fursuit = Fursuit.new
    fursuit.assign_attributes(arguments)

    begin
      fursuit.avatar = File.open("app/assets/images/species/#{fursuit.is_hybrid ? "Hybrid" : fursuit.species[0].avatar_file}.png")
    rescue
      fursuit.avatar = File.open("app/assets/images/species/FAILED.png")
    end

    raise Pundit::NotAuthorizedError unless FursuitPolicy.new(context[:current_user], fursuit).create?

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
