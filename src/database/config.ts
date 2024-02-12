import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, NODE_ENV } = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['src/entity/*{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: NODE_ENV === "development" ? true : false,
  logging: NODE_ENV === "development" ? false : false,
});

