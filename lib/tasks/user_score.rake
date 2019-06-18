namespace :user_score do
  task :strike => :environment do
    User.where("score < ?", -100).each do |u|
      SuspendedUser.create!(user: u, limit: Time.now + (2 ** u.offenses_number).days, reason: "Your Involvement Score has fallen below the acceptable limit. Please see Website User Guide to familiarise yourself with conduct guidelines.")
      u.update!(score: 0, offenses_number: u.offenses_number + 1)
    end
  end

  task :compute_global => :environment do
    User.find_each do |e|
      tags = FursuitMedium.where(user: e).distinct.count
      pictures = Medium.where(user: e).distinct.count
      comments = Comment.where(user: e).distinct.count
      scritchesGiven = Like.where(user_id: e).distinct.count
      scritchesReceived = Like.joins(:medium).where("media.user_id = ?", e.uuid).distinct.count
      favesGiven = Fave.where(user_id: e).distinct.count
      favesReceived = Fave.joins(:medium).where("media.user_id = ?", e.uuid).distinct.count * 2
      followers = Follow.where(follower_id: e.uuid).distinct.count
      following = Follow.where(followable_id: e.uuid).distinct.count
      e.update!(global_score: (pictures + tags + comments + scritchesGiven + scritchesReceived + favesGiven + favesReceived + followers + following))
    end
  end


  task :species => :environment do
    Rails.logger = Logger.new(STDOUT)
    species = Specy.all.order(:name).pluck(:name)
    count = (User.count.to_f / species.count.to_f).floor
    sp = 0
    j = 0
    puts User.where.not(uuid: SuspendedUser.all.pluck(:user_id)).order("users.global_score + users.score").pluck("users.global_score + users.score")
    User.where.not(uuid: SuspendedUser.all.pluck(:user_id)).order("users.global_score + users.score").each_with_index do |user, i|
      puts [i, j, count, sp, species.count].to_s
      begin
        user.update!(metric_species: species[sp])
        j += 1
        if j == count && sp < (species.count - 1)
          j = 0
          sp += 1
        end
      rescue => error
        TechReport.create!(kind: "exception", user: User.first, description: "FAILED SPECIES RAKE :: USER #{user.name} - #{user.uuid} - #{error.message}")
      end
    end
  end
end
