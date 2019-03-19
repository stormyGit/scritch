class ComputeUserScores < ApplicationJob
  queue_as :default

  def perform()
    User.find_each do |e|
      tags = FursuitMedium.where(user: e).distinct.count
      pictures = Medium.where(user: e).distinct.count

      e.update!(global_score: e.score + pictures + tags)
    end
    SpeciesMetric.perform_later()
  end

end
