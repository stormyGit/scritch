# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_10_153732) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "hstore"
  enable_extension "pg_trgm"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "activities", id: :serial, force: :cascade do |t|
    t.string "trackable_type", null: false
    t.uuid "trackable_id", null: false
    t.string "owner_type", null: false
    t.uuid "owner_id", null: false
    t.string "key"
    t.text "parameters"
    t.string "recipient_type", null: false
    t.uuid "recipient_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["owner_id", "owner_type"], name: "index_activities_on_owner_id_and_owner_type"
    t.index ["owner_type", "owner_id"], name: "index_activities_on_owner_type_and_owner_id"
    t.index ["recipient_id", "recipient_type"], name: "index_activities_on_recipient_id_and_recipient_type"
    t.index ["recipient_type", "recipient_id"], name: "index_activities_on_recipient_type_and_recipient_id"
    t.index ["trackable_id", "trackable_type"], name: "index_activities_on_trackable_id_and_trackable_type"
    t.index ["trackable_type", "trackable_id"], name: "index_activities_on_trackable_type_and_trackable_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "announcements", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "banned_users", force: :cascade do |t|
    t.string "telegram_id"
    t.text "ban_reason"
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }
    t.string "notification_message"
    t.datetime "banned_until"
    t.json "user_attributes", default: {}
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["telegram_id"], name: "index_banned_users_on_telegram_id"
  end

  create_table "chats", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }
    t.uuid "sender_id"
    t.uuid "recipient_id"
    t.datetime "accepted_at"
    t.boolean "is_sender_unread", default: false
    t.boolean "is_recipient_unread", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipient_id"], name: "index_chats_on_recipient_id"
    t.index ["sender_id"], name: "index_chats_on_sender_id"
    t.index ["uuid"], name: "index_chats_on_uuid", unique: true
  end

  create_table "chronofage_jobs", id: :serial, force: :cascade do |t|
    t.string "job_class"
    t.string "job_id"
    t.string "queue_name"
    t.text "arguments"
    t.integer "priority", default: 0
    t.string "host"
    t.datetime "started_at"
    t.datetime "completed_at"
    t.datetime "failed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "output"
  end

  create_table "comments", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.uuid "user_id"
    t.uuid "medium_id"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "parent_id"
    t.integer "replies_count", default: 0
  end

  create_table "follows", id: :serial, force: :cascade do |t|
    t.string "followable_type", null: false
    t.string "follower_type", null: false
    t.boolean "blocked", default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.uuid "followable_id"
    t.uuid "follower_id"
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
  end

  create_table "friendly_id_slugs", id: :serial, force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "likes", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.uuid "user_id"
    t.uuid "medium_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lists", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.uuid "user_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lists_users", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.uuid "user_id"
    t.uuid "list_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "media", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.string "title", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id"
    t.integer "duration"
    t.string "slug"
    t.integer "views_count", default: 0
    t.integer "comments_count", default: 0
    t.integer "likes_count", default: 0
    t.boolean "comments_disabled", default: false
    t.datetime "refused_at"
    t.boolean "share_on_twitter", default: true
    t.string "small_thumbnail_key"
    t.string "picture"
    t.integer "width"
    t.integer "height"
    t.json "details"
    t.json "exif"
    t.integer "size"
    t.index "to_tsvector('english'::regconfig, (title)::text)", name: "index_media_on_title", using: :gin
    t.index ["slug"], name: "index_media_on_slug", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }
    t.uuid "chat_id"
    t.uuid "sender_id"
    t.string "body"
    t.string "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chat_id"], name: "index_messages_on_chat_id"
    t.index ["created_at"], name: "index_messages_on_created_at"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
    t.index ["uuid"], name: "index_messages_on_uuid", unique: true
  end

  create_table "moderation_comments", force: :cascade do |t|
    t.uuid "subject_id"
    t.string "subject_type"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "moderator_id"
    t.index ["moderator_id"], name: "index_moderation_comments_on_moderator_id"
    t.index ["subject_id"], name: "index_moderation_comments_on_subject_id"
  end

  create_table "moderators", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "capabilities", default: [], array: true
    t.index ["email"], name: "index_moderators_on_email", unique: true
    t.index ["reset_password_token"], name: "index_moderators_on_reset_password_token", unique: true
  end

  create_table "reports", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }
    t.text "description"
    t.uuid "user_id"
    t.uuid "reporter_id"
    t.string "status", default: "new"
    t.bigint "assignee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignee_id"], name: "index_reports_on_assignee_id"
    t.index ["reporter_id"], name: "index_reports_on_reporter_id"
    t.index ["user_id"], name: "index_reports_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "statistics", force: :cascade do |t|
    t.integer "users"
    t.integer "chats"
    t.integer "messages"
    t.integer "likes"
    t.integer "media"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type", null: false
    t.uuid "taggable_id", null: false
    t.string "tagger_type"
    t.uuid "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type", "taggable_id"], name: "index_taggings_on_taggable_type_and_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
    t.index ["tagger_type", "tagger_id"], name: "index_taggings_on_tagger_type_and_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.string "bio"
    t.string "telegram_id"
    t.string "avatar"
    t.string "banner"
    t.string "theme", default: "dark"
    t.datetime "last_activities_read"
    t.string "website"
    t.boolean "public", default: true
    t.string "blocked_users_ids", default: [], array: true
    t.datetime "last_announcements_read"
    t.boolean "chat_enabled", default: true
    t.index ["name"], name: "index_users_on_name", opclass: :gin_trgm_ops, using: :gin
    t.index ["slug"], name: "index_users_on_slug", unique: true
  end

  create_table "views", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.string "ip"
    t.uuid "user_id"
    t.uuid "medium_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ip"], name: "index_views_on_ip"
    t.index ["medium_id"], name: "index_views_on_medium_id"
    t.index ["user_id"], name: "index_views_on_user_id"
  end

end
