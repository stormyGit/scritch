Sitemap::Generator.instance.load :host => ENV["DOMAIN"] do
  Medium.find_each do |medium|
    literal "/pictures/#{medium.slug}-#{medium.uuid}"
  end

  User.where(public: true).where(uuid: Medium.select(:user_id)).find_each do |user|
    literal "/#{user.slug}"
  end
end
