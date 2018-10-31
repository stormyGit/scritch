class ReportPolicy < ApplicationPolicy
  def create?
    record.reporter == user
  end
end
