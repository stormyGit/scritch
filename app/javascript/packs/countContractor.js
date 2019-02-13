export default count => {
  if (count >= 1000000) {
    return `${(count / 1000000.0).toFixed(2)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000.0).toFixed(1)}K`;
  }
  return `${count}`;
};
