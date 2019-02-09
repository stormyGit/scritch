namespace :sponsors do
  task cancel: :environment do
    Sponsor.where(status: "canceled").where("sponsors.limit < ?", Time.now).each do |e|
      e.destroy
    end
  end
end
