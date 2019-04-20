class SubscriptionCancel
  def initialize(id)
    @cus_id = id
  end

  def process
    sponsor.update_column(:status, "canceled")
    sponsor.user.create_activity :sponsorship_canceled, owner: Proc.new{ |_, model| User.last }, recipient: sponsor.user #TODO USER.MOD
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def sponsor
    @sponsor ||= Sponsor.where(customer_id: @cus_id[:id]).first!
  end
end
