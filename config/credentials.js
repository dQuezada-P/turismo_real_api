import { config } from "dotenv";
config();

export const ORACLE_USER = process.env.ORACLE_USER;
export const ORACLE_PASSWORD = process.env.ORACLE_PASSWORD;
export const ORACLE_CONNECT_STRING = process.env.ORACLE_CONNECT_STRING;