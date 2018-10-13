class SecureUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    Digest::SHA1.hexdigest("#{ENV["SECURE_UPLOADER_KEY"]}#{model.uuid}")
  end

  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end
