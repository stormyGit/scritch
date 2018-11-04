class SendTweetJob < ApplicationJob
  queue_as :default

  def perform(medium)
    return unless ENV["TWITTER_ACCESS_TOKEN"].present?

    client = build_client
    body = build_message_body_for(medium)

    if Rails.env.production?
      client.update(body)
    else
      Rails.logger.debug body
    end
  end

  def build_client
    Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_API_KEY"]
      config.consumer_secret     = ENV["TWITTER_CONSUMER_API_SECRET"]
      config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_SECRET_TOKEN"]
    end
  end

  def build_message_body_for(medium)
    elems = [
      { body: "New on ##{ENV['TWITTER_ACCOUNT']}!\n\n", truncate: 280 },
      { body: medium.title.strip, truncate: 30 },
      { body: " by ", truncate: 280 },
      { body: medium.user.name.strip, truncate: 30 },
      { body: " ", truncate: 280 },
      { body: Rails.application.routes.url_helpers.video_url(id: medium.slug + "-" + medium.uuid, host: ENV['DOMAIN']), truncate: 280 },
      { body: " ", truncate: 280 },
      { body: (medium.tag_list + Array(ENV['TWITTER_DEFAULT_TAGS'].split(','))).uniq.map { |tag| "##{tag}" }.join(" "), truncate: 30 }
    ]

    body = elems.reduce("") do |body, elem|
      body += elem[:body]
    end
    return body if body.length < 280

    elems.reduce("") do |body, elem|
      body += elem[:body].truncate(elem[:truncate])
    end
  end

end
