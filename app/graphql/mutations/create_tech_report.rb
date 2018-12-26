class Mutations::CreateTechReport < Mutations::BaseMutation
  argument :page, String, required: true
  argument :description, String, required: true

  field :report, Types::ReportType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    report = TechReport.new(arguments)
    report.user = context[:current_user]

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
