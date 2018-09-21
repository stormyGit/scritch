if Rails.env.development? || Rails.env.production?
  CarrierWave.configure do |config|
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     ENV['S3_ACCESS_KEY_ID'] || ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['S3_SECRET_ACCESS_KEY'] || ENV['AWS_SECRET_ACCESS_KEY'],
      region:                ENV['S3_REGION'],
      endpoint:              ENV['S3_ENDPOINT'],
      host:                  ENV['S3_HOST'],
      path_style:            true
    }
    config.storage = :fog
    config.fog_directory  = ENV['S3_BUCKET']
    config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" }
    config.fog_public = true

    if ENV["FILES_CLOUDFRONT_URL"].present?
      config.asset_host = ENV["FILES_CLOUDFRONT_URL"]
    end
  end
else
  CarrierWave.configure do |config|
    config.storage :file
  end
end
