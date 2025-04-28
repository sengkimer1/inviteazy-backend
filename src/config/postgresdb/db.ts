import { Pool } from "pg";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT), // Convert string to number
  });
  return pool;
};
