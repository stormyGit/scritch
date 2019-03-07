Telegram.bots_config = {
  default: ENV["TELEGRAM_ADMIN_BOT_TOKEN"],
  login: {token: ENV["TELEGRAM_LOGIN_BOT_TOKEN"], username: ENV["TELEGRAM_LOGIN_BOT_NAME"]},
  admin: {token: ENV["TELEGRAM_ADMIN_BOT_TOKEN"], username: ENV["TELEGRAM_ADMIN_BOT_NAME"]}
}
