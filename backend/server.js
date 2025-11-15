import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/admin.js";
import dashboardRoutes from "./routes/dashboard.js";
import menuRoutes from "./routes/menu.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send("DailyBasket Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
