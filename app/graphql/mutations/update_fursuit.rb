class Mutations::UpdateFursuit < Mutations::BaseMutation
  argument :id, ID, required: true
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
  argument :avatar, String, required: false
  argument :base_color, String, required: false
  argument :eyes_color, String, required: false

  field :fursuit, Types::FursuitType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    fursuit = Fursuit.find(arguments[:id])
    fursuit.assign_attributes(arguments)

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
