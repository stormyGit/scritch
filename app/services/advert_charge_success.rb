class AdvertChargeSuccess
  def initialize(id: id, amount: amount)
    @cus_id = id
    @refill =
      if amount == 400
        100000
      elsif amount == 3500
        1000000
      elsif amount == 30000
        10000000
      end
  end

  def process
    user.update_column(:available_impressions, @user.available_impressions + @refill)
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def user
    @user ||= User.where(customer_id: @cus_id).first!
  end
end
