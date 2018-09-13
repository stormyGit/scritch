# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Medium.destroy_all

users = 2.times.map do |index|
  User.create!({
    name: Faker::Name.middle_name,
  }).tap do |user|
    avatar = open(Faker::Avatar.image(index.to_s))
    user.avatar.attach(io: avatar, filename: "temp.#{avatar.content_type_parse.first.split("/").last}", content_type: avatar.content_type_parse.first)
  end
end

100.times do |index|
  Medium.create!({
    title: Faker::Book.title,
    description: 4.times.map { Faker::Movie.quote }.join(" "),
    user: users.sample
  })
end
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?