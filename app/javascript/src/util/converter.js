export const pageTitleToIndex = pageTitle => {
  let s = pageTitle.toLowerCase();
  if (s.includes("pictures")) {
    return 0;
  } else if (s.includes("fursuits")) {
    return 1;
  } else if (s.includes("makers")) {
    return 2;
  } else if (s.includes("events")) {
    return 3;
  } else if (s.includes("tag")) {
    return 4;
  } else if (s.includes("subscriptions")) {
    return 5;
  } else if (s.includes("favorites")) {
    return 6;
  }
  return false;
};