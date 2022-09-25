import {
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_PUBLIC_KEY,
  AWS_SECRET_KEY,
} from "./credentials.js";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export const uploadFile = async (file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const bucketParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };
  const command = new PutObjectCommand(bucketParams);
  const result = await client.send(command);

  console.log(result);
};

export const getUrl = async (file) => {
  const photo = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: file,
  });

  return await getSignedUrl(client, photo);
};
