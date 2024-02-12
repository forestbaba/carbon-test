import { NextFunction, Response } from "express";
import { customRequest } from "../interfaces/request.interface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET = "" } = process.env;

export class AuthMiddleware {
  static async isAuthenticated(
    req: customRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Access denied" });
      }
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Access denied" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      // Handle JWT verification errors more gracefully
      return res.status(401).json({ error: "Invalid token" });
    }
  }
}
