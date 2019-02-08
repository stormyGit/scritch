class CancelSponsorship < ApplicationJob
  queue_as :default

  def perform()
    #Sponsor.where(status: "canceled", limit: < Time.now).each do |e|
    #  e.destroy
    #end
  end

end
