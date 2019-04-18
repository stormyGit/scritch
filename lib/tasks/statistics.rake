namespace :statistics do
  task :gather_data => :environment do
    statistic = Statistic.create!(
      users: User.count,
      sponsors: Sponsor.count,
      likes: Like.count,
      media: Medium.count,
      faves: Fave.count,
      comments: Comment.count,
      tags: FursuitsMedium.count,
      claimed_suits: FursuitsUser.count,
      claimed_makers: Maker.where.not(user: nil).count
    )
    total = 0
    Medium.find_each do |m|
      total = m.completion
    end
    statistic.average_completion = total.to_f / Medium.count
    statistic.save!
  end
end
