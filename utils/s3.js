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
  DeleteObjectCommand,
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
  try {
    const stream = fs.createReadStream(file.tempFilePath);
    const bucketParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.name,
      Body: stream,
    };
    const command = new PutObjectCommand(bucketParams);
    await client.send(command);
  } catch (error) {
    console.error(error);
  }
};

export const getUrl = async (file) => {
  try {
    const photo = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: file,
    });

    return await getSignedUrl(client, photo);
  } catch (error) {
    console.error(error);
  }
};

export const deleteFile = async(file) =>{
  try {
    const bucketParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: file,
    }
    const command = new DeleteObjectCommand(bucketParams)
    return await client.send(command)
  } catch (error) {
    console.error(error)
  }
}
