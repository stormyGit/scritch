class SpeciesMetric < ApplicationJob
  queue_as :default

  def perform()
    species = FursuitSpecy.all.pluck(:name).order(:name)
    User.joins(:fursuit_media).group('users').count.sort_by{|e| e[1]}
  end

end
