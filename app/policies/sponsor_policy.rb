class SponsorPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def new?
    user && user.sponsor.blank?
  end

  def create?
    new?
  end

  def cancel?
    user && user.sponsor.status == "live" && user.sponsor.plan != "Free Trial"
  end

  def free_trial?
    user && user.used_free_trial == false
  end

  def update?
    user == record.user
  end

  def destroy?
    update?
  end
end
