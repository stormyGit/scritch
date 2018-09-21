class AvatarUploader < SecureUploader
  version :thumbnail do
    process resize_to_fill: [64, 64]
  end
end
