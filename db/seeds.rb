# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

App.create!(maintenance: false)
User.create!(name: "Toto", telegram_id: 124845744)
Moderator.create!(name: "toto", capabilities: ["adverts", "analytics", "announcements", "assets", "delete_and_edit", "events", "extra_analytics", "fursuit_claims", "maker_claims", "moderators", "reports", "sponsors", "suspended_users", "tickets", "tech", "tooltips"], telegram_id: 124845744)
