class EncodeVideoJob < ApplicationJob
  self.queue_adapter = :chronofage
  queue_as :default

  PROFILES = [
    {
      codec: "libx264",
      bandwidth: 1500000,
      resolution: 720,
      name: 'high',
    },
    {
      codec: "libx264",
      bandwidth: 800000,
      resolution: 480,
      name: 'medium'
    },
    {
      codec: "libx264",
      bandwidth: 400000,
      resolution: 480,
      name: 'low'
    }
  ]

  def perform(medium)
    Dir.mktmpdir do |wdir|
      @wdir = wdir
      @medium = medium

      download_input!
      perform_video_encoding!
      get_thumbnail!
      get_preview!
      get_duration!
    end

    @medium.create_activity key: 'medium.published', owner: @medium.user, recipient: @medium.user
  end

  def download_input!
    call_command("curl #{video_url} -s -o #{input_path}")
  end

  def perform_video_encoding!
    # Reencode
    ffmpeg_configurations = PROFILES.map { |profile| ffmpeg_configuration_for(profile) }.join(" ")

    call_command("ffmpeg -i #{input_path} -pass 1 #{ffmpeg_configurations}")
    call_command("ffmpeg -i #{input_path} -pass 2 #{ffmpeg_configurations}")

    # create index file
    indices = PROFILES.map do |profile|
      [
        "#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=#{profile[:bandwidth]}",
        "#{profile[:name]}_#{job_id}.m3u8"
      ]
    end
    File.open("#{@wdir}/index.m3u8", 'w') { |f| f.write("#EXTM3U\n" + indices.flatten.join("\n")) }

    # Upload to storage
    Dir["#{@wdir}/*.{ts,m3u8}"].each do |path|
      upload(path, "#{root_dir}/#{File.basename(path)}")
    end

    @medium.update(key: "#{root_dir}/index.m3u8")
  end

  def get_thumbnail!
    call_command "ffmpeg -i #{input_path} -vcodec mjpeg -vframes 1 -an -f rawvideo -ss #{video_middle} #{thumbnail_path}"

    upload(thumbnail_path, "#{root_dir}/thumbnail.jpg")
    @medium.update(thumbnail_key: "#{root_dir}/thumbnail.jpg")
  end

  def get_preview!
    call_command "ffmpeg -y -ss #{video_middle} -t 3 -i #{input_path} -vf fps=10,scale=320:-1:flags=lanczos,palettegen #{palette_path}"
    call_command "ffmpeg -ss #{video_middle} -t 3 -i #{input_path} -i #{palette_path} -filter_complex \"fps=10,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse\" #{preview_path}"

    upload(preview_path, "#{root_dir}/preview.gif")
    @medium.update(preview_key: "#{root_dir}/preview.gif")
  end

  def get_duration!
    output = JSON.parse(`ffprobe -of json -show_format_entry name -show_format #{input_path} -loglevel quiet`)

    @medium.update({
      duration: output["format"]["duration"].to_i
    })
  end

  protected

  def video_url
    Shellwords.escape("https://s3.amazonaws.com/#{ENV['TEMPORARY_S3_BUCKET']}/#{@medium.temporary_key}")
  end

  def input_path
    Shellwords.escape("#{@wdir}/input")
  end

  def thumbnail_path
    Shellwords.escape("#{@wdir}/thumbnail.jpeg")
  end

  def preview_path
    Shellwords.escape("#{@wdir}/preview.gif")
  end

  def palette_path
    Shellwords.escape("#{@wdir}/palette.png")
  end

  def video_middle
    Shellwords.escape(`ffmpeg -i #{input_path} 2>&1 | grep Duration | awk '{print $2}' | tr -d , | awk -F ':' '{print ($3+$2*60+$1*3600)/2}'`.chomp)
  end

  def root_dir
    @medium.uuid
  end

  def call_command(command)
    puts command
    system(command)
    raise if $?.to_i != 0
  end

  def ffmpeg_configuration_for(profile)
    "-vcodec #{profile[:codec]} -acodec aac -ac 1 -strict -2 -profile:v baseline -preset medium -b:v #{profile[:bandwidth]} -maxrate #{profile[:bandwidth]} -pix_fmt yuv420p -flags -global_header -hls_time 5 -hls_list_size 0 #{@wdir}/#{profile[:name]}_#{job_id}.m3u8"
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
