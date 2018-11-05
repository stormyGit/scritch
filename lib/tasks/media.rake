namespace :media do
  task resize_thumbnails: :environment do
    storage ||= Fog::Storage.new({
      provider:              'AWS',
      aws_access_key_id:     ENV['S3_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['S3_SECRET_ACCESS_KEY'],
      region:                ENV['S3_REGION'],
      endpoint:              ENV['S3_ENDPOINT'],
      host:                  ENV['S3_HOST'],
      path_style:            true
    })
    directory = storage.directories.get(ENV["S3_BUCKET"])

    Medium.where.not(thumbnail_key: nil).find_each do |medium|
      image =  MiniMagick::Image.open(MediumStorage.key_to_url(medium.thumbnail_key))
      image.format "jpg"
      image.combine_options do |c|
        c.resize "1080x"
        c.gravity 'center'
        c.quality 85
        c.repage.+
      end

      open(image.path) do |file|
        directory.files.create({
          key: medium.thumbnail_key,
          body: file,
          public: true
        })
      end

      image.combine_options do |c|
        c.resize "640x"
        c.gravity 'center'
        c.quality 85
        c.repage.+
      end

      open(image.path) do |file|
        directory.files.create({
          key: medium.thumbnail_key.gsub("thumbnail", "small_thumbnail"),
          body: file,
          public: true
        })
      end

      medium.update(small_thumbnail_key: medium.thumbnail_key.gsub("thumbnail", "small_thumbnail"))
    end
  end
end
