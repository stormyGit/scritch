export default (count, singular, plural) => {
  if (count === 0) {
    return (`No ${plural}`);
  }
  if (count === 1) {
    return (`One ${singular}`);
  }
  return (`${count} ${plural}`);
}
