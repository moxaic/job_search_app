import { Request } from "express";
import db from "../config/db";
import { Res } from "../utils/types";

export const getHome = async (req: Request, res: Res) => {
  const name = typeof res.user === "object" ? res.user?.name : "Test User";
  const [jobListings] = await db.query("SELECT * FROM jobs;");
  res.render("home", { title: "Home", name, jobListings });
};
