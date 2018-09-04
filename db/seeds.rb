# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Medium.destroy_all

user = User.create({
  name: "Test user"
})

100.times do |index|
  Medium.create({
    title: Faker::Book.title,
    description: 4.times.map { Faker::Movie.quote }.join(" "),
    user: user
  })
end
