class ThumbnailUploader < SecureUploader
  version :regular do
    process resize_to_fill: [1280, 720]
  end

  version :small do
    process resize_to_fill: [720, 480]
  end
end
