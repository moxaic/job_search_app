import { Router } from "express";
import { getLogout } from "../controllers/logout";

const logout = Router();

logout.get("/", getLogout);

export default logout;
