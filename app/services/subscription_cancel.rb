class SubscriptionCancel
  def initialize(id)
    @cus_id = id
  end

  def process
    sponsor.update_column(:status, "canceled")
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def sponsor
    @sponsor ||= Sponsor.where(customer_id: @cus_id[:id]).first!
  end
end
