import express from "express";
import * as UserControllers from "../controllers/usersControler";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requireAuth, UserControllers.getAuthentiacatedUser);

router.post("/signup", UserControllers.singup);

router.post("/login", UserControllers.login);

router.post("/logout", UserControllers.logout);

export default router;
