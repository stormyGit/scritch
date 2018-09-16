export function keyToUrl(key) {
  return (
    `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`
  );
}
