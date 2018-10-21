class RemoveS3KeyJob < ApplicationJob
  queue_as :default

  def perform(key)
    storage.files.new(key: key).destroy
  end

  def storage
    @storage ||= Fog::Storage.new({
      provider:              'AWS',
      aws_access_key_id:     ENV['S3_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['S3_SECRET_ACCESS_KEY'],
      region:                ENV['S3_REGION'],
      endpoint:              ENV['S3_ENDPOINT'],
      host:                  ENV['S3_HOST'],
      path_style:            true
    })
    @storage.directories.get(ENV["S3_BUCKET"])
  end
end
