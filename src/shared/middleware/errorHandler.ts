import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import multer from "multer";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  // Arquivo grande demais ou tipo recusado é erro do cliente, não do
  // servidor — sem isto o multer sobe como 500 e polui o Sentry.
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      status: "error",
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Arquivo excede o tamanho máximo permitido."
          : "Falha no envio do arquivo.",
    });
  }

  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    /**
     * Sem isto o 400 de validação some: só o ramo do 500 loga, e no Cloud Run
     * sobra a linha de request sem dizer QUAL campo o cliente errou.
     *
     * Loga só o caminho do campo e a mensagem do próprio schema — ambos são
     * texto fixo nosso. O valor recebido nunca entra aqui: em rotas como a
     * troca de cartão ele seria o número do cartão ou o CCV.
     */

    return res.status(400).json({
      status: "error",
      message: "Dados inválidos",
      errors: formattedErrors,
    });
  }

  console.error(error.stack);

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
};
