namespace :sponsors do
  task cancel: :environment do
    Sponsor.where("sponsors.limit < ?", Time.now).each do |e|
      stripeSponsor = Stripe::Subscription.retrieve(
        e.charge_id
      )
      stripeSponsor.destroy
      e.destroy
    end
  end
end
