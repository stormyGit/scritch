class Moderation::HomeController < ModerationController
  def index
  end

  def analytics
    ensure_capability! "analytics"

    tmp_today = (Statistic.last.created_at + 1.day).to_s
    tmp_today = tmp_today[0..tmp_today.index(':') - 4]

    @users_count = Statistic.pluck("date_trunc('day', created_at)", :users)
    @users_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end
    @users_now = User.count
    if params[:today].present?
      @users_count = @users_count + [[tmp_today, @users_now]]
    end

    @chats_count = Statistic.pluck("date_trunc('day', created_at)", :chats)
    @chats_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end
    if params[:today].present?
      @chats_count = @chats_count + [[tmp_today, Chat.count]]
    end

    @messages_count = Statistic.pluck("date_trunc('day', created_at)", :messages)
    @messages_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end
    if params[:today].present?
      @messages_count = @messages_count + [[tmp_today, Message.count]]
    end

    @likes_count = Statistic.pluck("date_trunc('day', created_at)", :likes)
    @likes_count.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end
    if params[:today].present?
      @likes_count = @likes_count + [[tmp_today, Like.count]]
    end

    @media = Statistic.pluck("date_trunc('day', created_at)", :media)
    @media.each do |u|
      if u.present?
        tmp = u[0].to_s
        u[0] = tmp[0..tmp.index(':') - 4]
      end
    end
    if params[:today].present?
      @media = @media + [[tmp_today, Picture.count]]
    end

    @users_per_day = []
    @users_count.sort.each_with_index do |u, index|
      @users_per_day = @users_per_day + [[u[0], @users_count.sort[index][1].to_i - (index == 0 ? 0 : @users_count.sort[index - 1][1].to_i)]]
    end
  end
end
