class ChargeSuccess
  def initialize(id)
    @cus_id = id
  end

  def process
    puts "\n" * 15
    puts "IN CHARGE SUCESS"
    puts "\n" * 15
    sponsor.update_column(:status, "live")
    limit = (sponsor.plan == "yearly" ? (1.year + 2.days) : (1.month + 2.days))
    sponsor.update_column(:limit, Time.now + limit)
    sponsor.user.create_activity :sponsorship_started, owner: Proc.new{ |_, model| User.last }, recipient: sponsor.user #TODO USER.MOD
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def sponsor
    sleep(2)
    Sponsor.where(customer_id: @cus_id[:id]).first!
  end
end
