class TechReport < ApplicationRecord
  belongs_to :user


    KINDS = [
      :general,
      :suggestion,
      :technical,
      :other
    ]
end
