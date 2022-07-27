import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Res extends Response {
  user?: string | JwtPayload;
}
