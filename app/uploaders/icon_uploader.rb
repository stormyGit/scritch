class IconUploader < SecureUploader
  process resize_to_fill: [96, 96]
end
