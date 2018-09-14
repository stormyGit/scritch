import AWS from "aws-sdk";
import crypto from 'crypto';
import Evaporate from 'evaporate';

var config = {
  signerUrl: '/s3/sign',
  aws_key: process.env.TEMPORARY_S3_ACCESS_KEY_ID,
  bucket: process.env.TEMPORARY_S3_BUCKET,
  region: process.env.TEMPORARY_S3_REGION,
  computeContentMd5: true,
  cryptoMd5Method: (data) => { AWS.util.crypto.md5(data, 'base64') },
  cryptoHexEncodedHash256: (data) => { return AWS.util.crypto.sha256(data, 'hex'); },
};

export default Evaporate.create(config);
