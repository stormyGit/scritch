class RemoveMediumFilesJob < ApplicationJob
  queue_as :default

  def perform(medium_id)
    @medium_id = medium_id

    storage.files.each do |file|
      storage.files.new(key: file.key).destroy
    end
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
    @storage.directories.get(ENV["S3_BUCKET"], prefix: root_dir)
  end

  def root_dir
    Digest::SHA1.hexdigest("#{ENV["SECURE_UPLOADER_KEY"]}#{@medium_id}")
  end

end
