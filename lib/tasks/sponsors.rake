namespace :sponsors do
  task cancel: :environment do
    Sponsor.where("sponsors.limit < ?", Time.now).each do |e|
      begin
        stripeSponsor = Stripe::Subscription.retrieve(
          e.charge_id
        )
        if stripeSponsor.present?
          stripeSponsor.delete
        end
      rescue => error
        TechReport.create!(description: "SPONSOR CANCEL RAKE :: #{e.charge_id} || USER: #{e.user.name} -- #{e.user.uuid}", user: User.first) #TODO USER.MOD
      end
      e.user.create_activity :sponsorship_ended, owner: Proc.new{ |_, model| User.last }, recipient: e.user #TODO USER.MOD
      e.destroy
    end
  end
end
