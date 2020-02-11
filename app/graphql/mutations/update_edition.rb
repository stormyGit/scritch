class Mutations::UpdateEdition < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :name, String, required: true
  argument :city, String, required: true
  argument :country, String, required: true
  argument :start_date, String, required: true
  argument :end_date, String, required: true
  argument :kind, String, required: true
  argument :theme, String, required: false
  argument :charity, String, required: false
  argument :guest_of_honours, String, required: false
  argument :attendance, Integer, required: false
  argument :venue, String, required: false
  argument :year, Integer, required: true

  field :edition, Types::EditionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    edition = Edition.find(arguments[:id])
    edition.assign_attributes(arguments.except(:guest_of_honours, :start_date, :end_date))

    if arguments[:guest_of_honours].present?
      edition.guest_of_honours = arguments[:guest_of_honours].split(",")
    end

    edition.start_date = DateTime.rfc3339(arguments[:start_date])
    edition.end_date = DateTime.rfc3339(arguments[:end_date])

    if edition.save
      {
        edition: edition,
        errors: [],
      }
    else
      {
        edition: edition,
        errors: edition.errors.full_messages
      }
    end
  end
end
