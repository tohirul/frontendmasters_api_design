import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
export const handleInputValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export const handleUserRequests = (
  req: Request,
  res: Response,
  fn: Function
) => {
  return fn(req as Request & { user: User }, res);
};
