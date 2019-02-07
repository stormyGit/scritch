class ChargeSuccess
  def initialize(id: id)
    @cus_id = id
  end

  def process
    sponsor.update_column(:status, "live")
    puts sponsor
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def sponsor
    @sponsor ||= Sponsor.where(customer_id: @cus_id).first!
  end
end
