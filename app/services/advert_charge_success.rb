class AdvertChargeSuccess
  def initialize(id, amount)
    @cus_id = id
    @refill =
      if amount == 600
        100000
      elsif amount == 5000
        1000000
      elsif amount == 40000
        10000000
      end
  end

  def process
    user.update(available_impressions: @user.available_impressions + @refill, bought_impressions: @user.bought_impressions + @refill)
    #ChargeMailer.confirmation(charge).deliver_later
  end

  private

  def user
    @user ||= User.where(customer_id: @cus_id).first!
  end
end
