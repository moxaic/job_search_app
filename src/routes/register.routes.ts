import { Router } from "express";
import { getRegister, postRegister } from "../controllers/register";

const register = Router();

register.get("/", getRegister);
register.post("/", postRegister);

export default register;
