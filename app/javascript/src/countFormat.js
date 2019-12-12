export default (count, singular, plural) => {
  if (count === 0) {
    return `No ${plural}`;
  }
  if (count === 1) {
    return `One ${singular}`;
  }
  if (count >= 1000000) {
    return `${(count / 1000000.0).toFixed(2)}M ${plural}`;
  }
  if (count >= 1000) {
    return `${(count / 1000.0).toFixed(1)}K ${plural}`;
  }
  return `${count} ${plural}`;
};
