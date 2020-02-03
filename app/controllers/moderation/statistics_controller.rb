class Moderation::StatisticsController < ModerationController
  def index
    ensure_capability! "analytics"

    total = 0
    Medium.find_each do |m|
      total = total + m.completion
    end
    average_completion = total.to_f / Medium.count
    total = 0
    Advert.find_each do |m|
      total = total + m.impressions
    end
    impressions_now = total

    @extra_capable = moderator_can_see?("extra_analytics")
    @now_data = [
      {title: "Users / Suspended", value: "#{User.count} / #{SuspendedUser.count}", lock: false},
      {title: "Moderators", value: Moderator.count, lock: false},
      {title: "Media / Tags", value: "#{Medium.count} / #{FursuitMedium.count}", lock: false},
      {title: "Adverts", value: Advert.count, lock: true},
      {title: "Makers / Claimed", value: "#{Maker.count} / #{Maker.where.not(user: nil).count}", lock: false},
      {title: "Reports (O, C, A)", value: "#{Report.count} (#{Report.where(status: "new", assignee_id: nil).count} / #{Report.where("reports.status = 'accepted' OR reports.status = 'dismissed' OR reports.status = 'closed'").count} / #{Report.where(status: "new").where.not(assignee_id: nil).count})", lock: false},
      {title: "Average Tag Completion", value: "#{average_completion}%", lock: false},
      {title: "Total Impressions", value: impressions_now, lock: true},
      {title: "Fursuits / Claimed", value: "#{Fursuit.count} / #{FursuitUser.count}", lock: false},
      {title: "Scritches", value: Like.count, lock: false},
      {title: "Faves", value: Fave.count, lock: false},
      {title: "Sponsors (FT / C / L)", value: "#{Sponsor.count} (#{Sponsor.where(plan: "Free Trial").count} / #{Sponsor.where(status: "canceled").count} / #{Sponsor.where(status: "live").where.not(plan: "Free Trial").count})", lock: true},
      {title: "Events / Editions", value: "#{Event.count} / #{Edition.count}", lock: false},
      {title: "Storage Disk Usage", value: "#{`df -m /`.split(/\b/)[24].to_i}%", lock: false}
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

    pp @now_data
    pp @users_count
    pp @sponsors_count
    pp @media_count
    pp @average_completion
    pp @users_per_day
    pp @impressions_count
    pp @impressions_per_day
  end
end
