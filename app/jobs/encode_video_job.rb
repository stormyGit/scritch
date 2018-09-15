class EncodeVideoJob < ApplicationJob
  self.queue_adapter = :chronofage
  queue_as :default

  PROFILES = [
    {
      codec: "libx264",
      bandwidth: 1000000,
      resolution: 720,
      name: 'high',
    },
    {
      codec: "libx264",
      bandwidth: 600000,
      resolution: 480,
      name: 'medium'
    },
    {
      codec: "libx264",
      bandwidth: 300000,
      resolution: 480,
      name: 'low'
    }
  ]

  def perform(medium)
    Dir.mktmpdir do |wdir|
      video_url = Shellwords.escape("https://s3.amazonaws.com/#{ENV['TEMPORARY_S3_BUCKET']}/#{medium.temporary_key}")
      input_path = Shellwords.escape("#{wdir}/input")

      # Download input
      call_command("curl #{video_url} -s -o #{input_path}")

      # Reencode
      ffmpeg_configurations = PROFILES.map { |profile| ffmpeg_configuration_for(profile, wdir) }.join(" ")

      call_command("ffmpeg -i #{input_path} -pass 1 #{ffmpeg_configurations}")
      call_command("ffmpeg -i #{input_path} -pass 2 #{ffmpeg_configurations}")

      # create index file
      indices = PROFILES.map do |profile|
        [
          "#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=#{profile[:bandwidth]}",
          "#{profile[:name]}_#{job_id}.m3u8"
        ]
      end
      File.open("#{wdir}/index.m3u8", 'w') { |f| f.write("#EXTM3U\n" + indices.flatten.join("\n")) }

      # Upload to storage
      root_dir = SecureRandom.uuid
      Dir["#{wdir}/*.{ts,m3u8}"].each do |path|
        upload(path, "#{root_dir}/#{File.basename(path)}")
      end

      medium.update(key: "#{root_dir}/index.m3u8")
    end
  end

  protected

  def call_command(command)
    puts command
    system(command)
    raise if $?.to_i != 0
  end

  def ffmpeg_configuration_for(profile, wdir)
    "-vcodec #{profile[:codec]} -acodec aac -ac 1 -strict -2 -profile:v baseline -preset medium -b:v #{profile[:bandwidth]} -maxrate #{profile[:bandwidth]} -pix_fmt yuv420p -flags -global_header -hls_time 5 -hls_list_size 0 #{wdir}/#{profile[:name]}_#{job_id}.m3u8"
  end

  def storage
    @storage ||= Fog::Storage.new({
      provider:              'AWS',
      aws_access_key_id:     ENV['S3_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['S3_SECRET_ACCESS_KEY'],
      region:                ENV['S3_REGION'],
      endpoint:              ENV['S3_ENDPOINT'],
      host:                  ENV['S3_HOST'],
      path_style:            true
    })
    @storage.directories.get(ENV["S3_BUCKET"])
  end

  def upload(path, key)
    open(path) do |file|
      storage.files.create({
        key: key,
        body: file,
        public: true
      })
    end.public_url
  end
end
