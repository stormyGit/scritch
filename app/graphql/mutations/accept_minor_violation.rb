class Mutations::AcceptMinorViolation < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :kind, String, required: true

  field :errors, [String], null: false

  def resolve(arguments)
    if arguments[:kind] == "user"
      report = Report.find(arguments[:id])
      user = report.user

      user.update!(score: user.score - 10) #__SCORE__ MINOR MEDIUM VIOLATION

      Report.where(status: 'new', user_id: user.id).each do |e|
        e.update(status: 'accepted')
        u = User.find(e.reporter_id)
        u&.update!(score: u.score + 10)
      end

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
      user = report.medium.user

      user.update!(score: user.score - 10) #__SCORE__ MINOR MEDIUM VIOLATION

      MediumReport.where(status: 'new', comment_id: report.comment.id).each do |e|
        e.update(status: 'accepted')
        u = User.find_by(uuid: e.reporter_id)
        u&.update!(score: u.score + 10)
      end

      report.medium.destroy

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
      user = report.comment.user

      user.update!(score: user.score - 10) #__SCORE__ MINOR COMMENT VIOLATION

      CommentReport.where(status: 'new', comment_id: report.comment.id).each do |e|
        e.update(status: 'accepted')
        u = User.find_by(uuid: e.reporter_id)
        u&.update!(score: u.score + 10)
      end

      report.comment.destroy

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
