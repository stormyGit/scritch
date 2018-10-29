class IdXor
  def self.xor_ids(id1, id2)
    uuid_range = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ]

    parts1 = id1.split("-").map { |part| part.split('') }
    parts2 = id2.split("-").map { |part| part.split('') }

    parts1.map.with_index do |part, index|
      part.map.with_index do |uuid_byte, uuid_byte_index|
        uuid_range[(uuid_range.index(uuid_byte) + uuid_range.index(parts2[index][uuid_byte_index])) % uuid_range.length]
      end
    end.map do |part|
      part.join("")
    end.join("-")
  end
end
