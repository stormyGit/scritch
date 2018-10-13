class AvatarUploader < SecureUploader
  version :thumbnail do
    process resize_to_fill: [192, 192]
  end
end
