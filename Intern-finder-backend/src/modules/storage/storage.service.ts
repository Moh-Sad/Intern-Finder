import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import r2 from "../../config/r2";
import env from "@/config/env";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";



const BUCKET = env.R2_BUCKET;

export const uploadFile = async (key: string, fileBuffer: Buffer, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2.send(command);
  const url = await getSignedUrl(key, 3600);
  return url;
};

export const profilePicture = async (key: string, fileBuffer: Buffer, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2.send(command);
  const url = await getSignedUrl(key, 3600);
  return url;
};

export const getSignedUrl = async (key: string, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const url = await awsGetSignedUrl(r2, command, { expiresIn });

  return url;
};