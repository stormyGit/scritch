Sitemap::Generator.instance.load :host => ENV["DOMAIN"] do
  Medium.published.publicly_available.find_each do |medium|
    literal "/videos/#{medium.slug}-#{medium.uuid}"
  end

  User.where(public: true).where(uuid: Medium.published.publicly_available.select(:user_id)).find_each do |user|
    literal "/#{user.slug}"
  end
end
