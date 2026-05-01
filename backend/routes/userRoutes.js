import express from "express";
import { addUser, getUsers, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/add", addUser);
router.post("/login", loginUser);
router.get("/", getUsers);

export default router;
