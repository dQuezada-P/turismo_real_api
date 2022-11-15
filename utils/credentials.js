import { config } from "dotenv";
config();

//? AWS
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const AWS_FILE_ROUTE = {
  D: 'departments/',
  T: 'tours/'
}

//? Mercago Pago

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN