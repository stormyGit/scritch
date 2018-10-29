export function combineUUIDs(id1, id2) {
  const UUID_RANGE = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ];

	const parts1 = id1.split("-").map((part) => part.split(''));
  const parts2 = id2.split("-").map((part) => part.split(''));

  const resultParts = parts1.map((part, index) => (
    part.map((uuidByte, uuidByteIndex) => (
      UUID_RANGE[(UUID_RANGE.indexOf(uuidByte) + UUID_RANGE.indexOf(parts2[index][uuidByteIndex])) % UUID_RANGE.length]
    ))
  ));

  return (resultParts.map((part) => part.join("")).join("-"));
}
