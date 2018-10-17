export function keyToUrl(key) {
  return (
    `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`
  );
}

export function keyToCdnUrl(key) {
  if (process.env.FILES_CLOUDFRONT_URL) {
    return (
      `${process.env.FILES_CLOUDFRONT_URL}/${key}`
    );
  } else {
    return (keyToUrl(key));
  }
x}
