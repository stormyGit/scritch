class ImpressionCountJob < ApplicationJob
  queue_as :default

  def perform(advert)
    advert.update!(impressions: advert.impressions + 1)
    advert.user.update!(available_impressions: advert.user.available_impressions - 1)
    if advert.user.available_impressions < 1
      if advert.user.available_impressions < 0
        advert.user.update!(available_impressions: 0)
      end
      advert.update!(status: "Out of impressions")
    end
  end
end
