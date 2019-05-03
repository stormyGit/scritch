class ChargeSuccess
  def initialize(id)
    @cus_id = id
  end

  def process
    sponsor.update_column(:status, "live")
    limit =
      case sponsor.plan
      when "yearly"
        (1.year + 2.days)
      when "monthly"
        (1.month + 2.days)
      when "semester"
        (6.month + 2.days)
      end
    sponsor.update_column(:limit, Time.now + limit)
    sponsor.user.create_activity :sponsorship_started, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: sponsor.user
  end

  private

  def sponsor
    sleep(2)
    Sponsor.where(customer_id: @cus_id[:id]).first!
  end
end
