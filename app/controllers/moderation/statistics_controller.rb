class Moderation::StatisticsController < ModerationController
  def index
    ensure_capability! "analytics"

    total = 0
    Medium.find_each do |m|
      total = total + m.completion
    end
    average_completion = total.to_f / Medium.count

    @now_data = [
      {title: "Users", value: User.count},
      {title: "Sponsors (FT / C / L)", value: "#{Sponsor.count} (#{Sponsor.where(status: "Free Trial").count} / #{Sponsor.where(status: "canceled").count} / #{Sponsor.where(status: "live").count})"},
      {title: "Adverts", value: Advert.count},
      {title: "Total Impressions", value: Statistic.last.impressions},
      {title: "Reports (O, C, A)", value: "#{Report.count} (#{Report.where(status: "new", assignee_id: nil).count} / #{Report.where("reports.status = 'accepted' OR reports.status = 'dismissed' OR reports.status = 'closed'").count} / #{Report.where(status: "new").where.not(assignee_id: nil).count})"},
      {title: "Suspended Users", value: SuspendedUser.count},
      {title: "Moderators", value: Moderator.count},
      {title: "Fursuits", value: Fursuit.count},
      {title: "Makers", value: Maker.count},
      {title: "Events / Editions", value: "#{Event.count} / #{Edition.count}"},
      {title: "Media", value: Medium.count},
      {title: "Average Tag Completion", value: "#{average_completion}%"},
      {title: "Scritches", value: Like.count},
      {title: "Faves", value: Fave.count},
      {title: "Tags", value: FursuitMedium.count},
      {title: "Claimed Suits", value: FursuitUser.count},
      {title: "Claimed Makers", value: Maker.where.not(user: nil).count}
    ]

    @users_count = Statistic.pluck("date_trunc('day', created_at)", :users)
    @users_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end
    @users_now = User.count

    @sponsors_count = Statistic.pluck("date_trunc('day', created_at)", :sponsors)
    @sponsors_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end

    @media_count = Statistic.pluck("date_trunc('day', created_at)", :media)
    @media_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end

    @average_completion = Statistic.pluck("date_trunc('day', created_at)", :average_completion)
    @average_completion.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end

    @users_per_day = []
    @users_count.sort.each_with_index do |u, index|
      @users_per_day = @users_per_day + [[u[0], @users_count.sort[index][1].to_i - (index == 0 ? 0 : @users_count.sort[index - 1][1].to_i)]]
    end

    @impressions_count = Statistic.pluck("date_trunc('day', created_at)", :impressions)
    @impressions_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end

    @impressions_per_day = []
    @impressions_count.sort.each_with_index do |u, index|
      @impressions_per_day = @impressions_per_day + [[u[0], @impressions_count.sort[index][1].to_i - (index == 0 ? 0 : @impressions_count.sort[index - 1][1].to_i)]]
    end
  end
end
