process.env.TZ = process.env.BILLING_TIMEZONE || "America/Sao_Paulo";

import { App } from "./App";

const server = new App();

server.listen();
