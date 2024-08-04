// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user_routes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_DB_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

// Connect to MongoDB
connectToDatabase();

//defining routes
// app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/images", express.static("uploads"));
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);
app.use("/experiences", experienceRoutes);
// app.use("/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
