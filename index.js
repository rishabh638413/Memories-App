import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postroutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// ✅ Correct route usage

app.use("/posts", postroutes);
app.use("/user", userRoutes);

// MongoDB connection string

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

// Connect to MongoDB and start server // mongoose ko connect kra gya hai bs
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });
