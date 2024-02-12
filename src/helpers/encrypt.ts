import jwt, { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { payload } from "../dto/createuser.dto";
import { NextFunction } from "express";
dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    const hash = bcrypt.hashSync(password, 12);
    return hash;
  }

  static generateToken(payload: payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }

  static verifyToken = async (req, res, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json([{ error: true, message: "Token required, authorization denied" }]);
    }
  
    try {
      const decoded = verify(token, JWT_SECRET);
  
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json([{ error: true, message: err }]);
    }
  }
}
