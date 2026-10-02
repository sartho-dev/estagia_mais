import { Request, Response, NextFunction } from "express";

type AsyncRoute = (req: Request, res: Response) => Promise<void>;

export const asyncHandler = (fn: AsyncRoute) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res)).catch(next);
  };
};
