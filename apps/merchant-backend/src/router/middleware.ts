import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_MERCHANT_PASS, JWT_USER_PASS } from "../config";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const verifyToken = (token: string, secret: string): { id: string } | null => {
  try {
    return jwt.verify(token, secret) as { id: string };
  } catch (error) {
    return null;
  }
};

export const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;
  const verified = verifyToken(token, JWT_USER_PASS);

  if (verified) {
    req.id = verified.id;
    next();
  } else {
    return res.status(403).json({ message: "Not Authorized" });
  }
};

export const merchantAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;
  const verified = verifyToken(token, JWT_MERCHANT_PASS);

  if (verified) {
    req.id = verified.id;
    next();
  } else {
    return res.status(403).json({ message: "Not Authorized" });
  }
};
