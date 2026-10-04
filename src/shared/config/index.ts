import dotenv from "dotenv";

dotenv.config();

// Validation of required environment variables
const requiredEnvVars = ["JWT_SECRET"] as const;
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config = {
  mode: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET!, // now guaranteed to exist
  port: Number(process.env.PORT) || 3000,
  host: "0.0.0.0",
  refreshTokenCleanupIntervalMinutes: Number(
    process.env.REFRESH_TOKEN_CLEANUP_INTERVAL_MINUTES || 60,
  ),
  sentryDsn: process.env.SENTRY_DSN || "",

  // Intervalo (minutos) entre varreduras do job que finaliza distratos cuja
  // janela de aviso prévio de 4 meses já decorreu (Task 25).

  bcryptCost: Number(process.env.BCRYPT_COST ?? 12),
  sessionIdleMs: Number(process.env.SESSION_IDLE_MS ?? 1_800_000),
  sessionMaxAgeMs: Number(process.env.SESSION_MAX_AGE_MS ?? 7_200_000),
  touchThrottleMs: Number(process.env.TOUCH_THROTTLE_MS ?? 60_000),

  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "cybercastle_dev",
    storage: process.env.DB_STORAGE || "./database.sqlite",
  },

  mail: {
    host: process.env.SMTP_HOST || "smtp.mailtrap.io",
    port: Number(process.env.SMTP_PORT) || 2525,
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.EMAIL_FROM || "",
  },
};
