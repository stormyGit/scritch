class Mutations::RejectNotWorthReporting < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :kind, String, required: true

  field :errors, [String], null: false

  def resolve(arguments)
    if arguments[:kind] == "user"
      report = Report.find(arguments[:id])
      user = report.reporter

      user.update!(score: user.score - 10)
      report.status = "accepted"

      if report.save
        {
          errors: [],
        }
      else
        {
          errors: report.errors.full_messages
        }
      end


    elsif arguments[:kind] == "media"
      report = MediumReport.find(arguments[:id])
      user = report.reporter

      user.update!(score: user.score - 10)
      report.status = "accepted"

      if report.save
        {
          errors: [],
        }
      else
        {
          errors: report.errors.full_messages
        }
      end


    elsif arguments[:kind] == "comment"
      report = CommentReport.find(arguments[:id])
      user = report.reporter

      user.update!(score: user.score - 10)
      report.status = "accepted"

      if report.save
        {
          errors: [],
        }
      else
        {
          errors: report.errors.full_messages
        }
      end

    end

  end
end
