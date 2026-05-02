import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRouter from "./src/router/userRouter.js";
import cookieParser from "cookie-parser";
import famerRouter from "./src/router/farmerRouter.js";
import milkRouter from "./src/router/milkRouter.js";
import retailerRouter from "./src/router/retailerRouter.js";
import OpenRateMilkRouter from "./src/router/openRateMilkRouter.js";
import SaleMilkRouter from "./src/router/saleMilkRouter.js";
import addHomeDelivery from "./src/router/addHomeDeliveryRouter.js";

const app = express();
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow if no origin (server-to-server or tools like Postman) 
    // or if the origin is in our whitelist or is a local dev origin
    if (!origin || allowedOrigins.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", famerRouter);
app.use("/api", milkRouter);
app.use("/api", retailerRouter);
app.use("/api", OpenRateMilkRouter);
app.use("/api", SaleMilkRouter);
app.use("/api", addHomeDelivery);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database:", error);
  process.exit(1);
});