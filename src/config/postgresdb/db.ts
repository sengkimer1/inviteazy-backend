import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "inviteazy",
    host: "localhost",
    database: "mydb",
    password: "12345678",
    port: 5433,
  });
  return pool;
};
