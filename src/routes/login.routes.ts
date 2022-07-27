import { Router } from "express";
import { getLogin, postLogin } from "../controllers/login";

const login = Router();

login.get("/", getLogin);
login.post("/", postLogin);

export default login;
