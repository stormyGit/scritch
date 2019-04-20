namespace :statistics do
  task :gather_data => :environment do
    statistic = Statistic.create!(
      users: User.count,
      sponsors: Sponsor.count,
      likes: Like.count,
      media: Medium.count,
      faves: Fave.count,
      comments: Comment.count,
      tags: FursuitMedium.count,
      claimed_suits: FursuitUser.count,
      claimed_makers: Maker.where.not(user: nil).count
    )
    total = 0
    Medium.find_each do |m|
      total = total + m.completion
    end
    statistic.average_completion = total.to_f / Medium.count
    statistic.save!
  end
end
