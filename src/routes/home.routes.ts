import { Router } from "express";
import { getHome } from "../controllers/home";

const home = Router();

home.get("/", getHome);

export default home;
