class MediumStorage
  def self.key_to_url(key)
    "#{ENV['S3_ENDPOINT']}/#{ENV['S3_BUCKET']}/#{key}"
  end

  def self.key_to_cdn_url(key)
    if ENV["FILES_CLOUDFRONT_URL"].present?
      "#{ENV['FILES_CLOUDFRONT_URL']}/#{key}"
    else
      key_to_url key
    end
  end
end
