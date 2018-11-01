namespace :sitemap_publisher do
  task publish: [:environment, "sitemap:generate"] do
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

    directory.files.create({
      key: "sitemap.xml",
      body: File.open(Rails.root.join("public", "sitemap.xml")),
      public: true
    })
  end
end
