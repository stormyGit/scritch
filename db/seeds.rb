# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Event.destroy_all
Edition.destroy_all
Medium.destroy_all

users = 2.times.map do |index|
  User.create!({
    telegram_id: rand(10000000),
    name: Faker::Name.middle_name,
  })
end
users << User.create(telegram_id: 122117046, name: "Casper")

events = 10.times.map do |index|
  Event.create!({
    name: Faker::Name.middle_name,
  })
end

editions = 40.times.map do |index|
  Edition.create!({
    event: events.sample,
    name: Faker::Name.middle_name,
    city: Faker::Address.city,
    country: Faker::Address.country,
    kind: "convention",
    year: 2020 - rand(10),
    attendance: rand(3000),
  })
end

20.times do |index|
  Medium.create!({
    title: Faker::Book.title,
    description: 4.times.map { Faker::Movie.quote }.join(" "),
    user: users.sample,
    edition: editions.sample,
    picture: open(Faker::Placeholdit.image("1024x1024", 'jpg'))
  })
end
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
