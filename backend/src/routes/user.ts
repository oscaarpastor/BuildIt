import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
  getCurrentUser
} from "../controllers/user";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

// ✅ Nueva ruta de login
router.post("/login", loginUser);
router.get("/me", getCurrentUser);

export default router;
