class ChatUploader < SecureUploader
  version :thumbnail do
    process resize_to_fill: [500, 500]
  end
end
