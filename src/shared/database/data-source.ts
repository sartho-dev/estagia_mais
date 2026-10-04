import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { config } from "../config";

const isProd = process.env.NODE_ENV === "production";

// Define a pasta base dependendo do ambiente
const baseDir = isProd
  ? path.join(__dirname, "../../")
  : path.join(__dirname, "../../");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: false,
  logging: false,
  // Usa o path.join para garantir que ele ache os arquivos, não importa a subpasta
  entities: [path.join(baseDir, "modules/**/schema/*.{js,ts}")],
  migrations: [path.join(baseDir, "shared/database/migrations/*.{js,ts}")],

  // Isso força o SSL necessário para o Google Cloud SQL
  ssl: false,
});
