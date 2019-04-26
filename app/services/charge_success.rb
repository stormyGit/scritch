class ChargeSuccess
  def initialize(id)
    @cus_id = id
  end

  def process
    sponsor.update_column(:status, "live")
    limit = (sponsor.plan == "yearly" ? (1.year + 2.days) : (1.month + 2.days))
    sponsor.update_column(:limit, Time.now + limit)
    sponsor.user.create_activity :sponsorship_started, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: sponsor.user #TODO USER.MOD
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def sponsor
    sleep(2)
    Sponsor.where(customer_id: @cus_id[:id]).first!
  end
end
