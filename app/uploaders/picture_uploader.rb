class PictureUploader < SecureUploader
  version :thumbnail do
    process resize_to_fill: [512, 512]
  end
end
