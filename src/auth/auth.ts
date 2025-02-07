import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

export const generateToken = (payload: { id: string; username: string }) => {
  return jwt.sign(payload, config?.jwt?.secret as string, {
    expiresIn: "1d",
  });
};
interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, config?.jwt?.secret as string);
    // console.log(decoded);
    Object.assign(req, { user: decoded });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, config?.bcrypt_salt_rounds);
};
