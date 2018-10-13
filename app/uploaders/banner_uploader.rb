class BannerUploader < SecureUploader
  version :regular do
    process resize_to_fill: [1600, 528]
  end
end
