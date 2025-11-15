import express from "express";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome to DailyBasket Admin Dashboard!" });
});

export default router;
