import express, { Application } from "express";
import { Server } from "http";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./shared/database/data-source"; // Ajuste o caminho conforme seu projeto
import { config } from "./shared/config"; // Ajuste o caminho conforme seu projeto
import routesMain from "./routes"; // Ajuste o caminho conforme seu projeto
import { errorHandler } from "./shared/middleware/errorHandler"; // Ajuste o caminho
import swaggerSpec from "./shared/docs/swagger"; // Ajuste o caminho

export class App {
  private _app: Application;
  private server: Server | null = null;

  constructor() {
    this._app = express();
    this.config();
    this.routes();
  }

  private config() {
    this._app.use(helmet());

    const corsOptions = {
      origin: [
        "http://localhost:5173", // URL padrão do Vite/React
        // Adicione as URLs do seu frontend de vagas aqui futuramente
      ],
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
      exposedHeaders: ["Content-Disposition"],
    };
    this._app.use(cors(corsOptions));

    this._app.use(express.json());

    // Configuração de Trust Proxy mantida (ótima prática para rodar atrás de Docker/Nginx/Cloud)
    this._app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS ?? 1));

    this._app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private routes() {
    this._app.use(routesMain);
    this._app.use(errorHandler);
  }

  private async initDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("📦 Banco de dados conectado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao conectar no banco de dados:", error);
      process.exit(1);
    }
  }

  public async listen(): Promise<void> {
    await this.initDatabase();

    this.server = this._app.listen(config.port, "0.0.0.0", () => {
      console.log(`🚀 Servidor rodando em http://0.0.0.0:${config.port}`);
      console.log(
        `📚 Documentação disponível em: http://localhost:${config.port}/api-docs`,
      );
    });
  }

  public get app() {
    return this._app;
  }
}
