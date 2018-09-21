class BannerUploader < SecureUploader
  version :thumbnail do
    process resize_to_fill: [1920, 600]
  end
end
