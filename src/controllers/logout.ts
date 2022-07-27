import { Request } from "express";
import { Res } from "../utils/types";

export const getLogout = (req: Request, res: Res) => {
  console.log("logout-> user logged out");
  res.clearCookie("token").redirect("/login");
};
