import Evaporate from 'evaporate';
import md5 from 'js-md5';
import { sha256 } from 'js-sha256';

var config = {
  signerUrl: '/s3/sign',
  aws_key: process.env.TEMPORARY_S3_ACCESS_KEY_ID,
  bucket: process.env.TEMPORARY_S3_BUCKET,
  awsRegion: process.env.TEMPORARY_S3_REGION,
  computeContentMd5: true,
  cryptoMd5Method: (data) => ( md5.base64(data) ),
  cryptoHexEncodedHash256: (data) => ( sha256.hex(data) ),
};

export default () => {
  let signHeaders = {};
  const token = localStorage.getItem('token');
  if (token) {
    signHeaders['Authorization'] = `Bearer ${token}`;
  }

  return (
    Evaporate.create({
      ...config,
      signHeaders
    })
  );
}
