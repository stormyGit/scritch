class Mutations::AcceptSeriousViolation < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :kind, String, required: true

  field :errors, [String], null: false

  def resolve(arguments)
    if arguments[:kind] == "user"
      report = Report.find(arguments[:id])
      user = report.user

      # raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).destroy?

      Report.where(status: 'new', user_id: user.id).each do |e|
        e.update(status: 'accepted')
        u = User.find_by(uuid: e.reporter_id)
        u&.update!(score: u.score + 10)
      end

      if user.suspended_user.blank?
        SuspendedUser.create!(user: user, limit: Time.now + (2 ** user.offenses_number).days, reason: "User profile was in serious violation of Scritch's terms of use")
      end
      user.update!(score: user.score - 100, offenses_number: user.offenses_number + 1) #__SCORE__ SERIOUS MEDIUM VIOLATION

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

    end


  end
end
