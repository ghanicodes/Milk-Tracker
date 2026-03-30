import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRouter from "./src/router/userRouter.js";
import cookieParser from "cookie-parser";
import famerRouter from "./src/router/farmerRouter.js";
import milkRouter from "./src/router/milkRouter.js";
import retailerRouter from "./src/router/retailerRouter.js";
import OpenRateMilkRouter from "./src/router/openRateMilkRouter.js";
import SaleMilkRouter from "./src/router/saleMilkRouter.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", famerRouter);
app.use("/api", milkRouter);
app.use("/api", retailerRouter);
app.use("/api", OpenRateMilkRouter);
app.use("/api", SaleMilkRouter);


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