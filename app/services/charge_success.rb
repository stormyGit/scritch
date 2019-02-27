class ChargeSuccess
  def initialize(id)
    @cus_id = id
  end

  def process
    sponsor.update_column(:status, "live")
    limit = (sponsor.plan == "yearly" ? (1.year + 2.days) : (1.month + 2.days))
    sponsor.update_column(:limit, Time.now + limit)
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def sponsor
    @sponsor ||= Sponsor.where(customer_id: @cus_id).first!
  end
end
