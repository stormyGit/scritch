class Mutations::CreateTagReport < Mutations::BaseMutation
  argument :medium_id, ID, required: true
  argument :description, String, required: true
  argument :fursuit_medium_ids, [ID], required: true

  field :report, Types::ReportType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    report = TagReport.new(medium_id: arguments[:medium_id], description: arguments[:description])
    report.reporter = context[:current_user]

    report.fursuit_medium_ids = FursuitMedium.where(medium_id: arguments[:medium_id], fursuit_id: arguments[:fursuit_medium_ids]).pluck(:uuid)
    #raise Pundit::NotAuthorizedError unless ReportPolicy.new(context[:current_user], report).create?

    if report.save
      {
        report: report,
        errors: [],
      }
    else
      {
        report: nil,
        errors: report.errors.full_messages
      }
    end
  end
end
