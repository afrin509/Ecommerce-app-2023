import express from "express";
const app = express();
import morgan from "morgan";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// import bodyParser from "body-parser";
import cors from "cors";
import { scrapeAndStoreProduct } from "./client/src/utils/amazonscrapping.js"
app.use(morgan("dev"));
app.use(express.json({ limit: "25mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));
// delete app.use(express.bodyParser());

connectDB();
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", function (req, res) {
  res.send("hello world");
});
app.get("/hell", function (req, res) {
  res.send("hell");
});
app.use((req, res, next) => {
  const source = req.header("X-Requested-From");

  if (source === "frontend") {
    // Handle frontend request
    console.log("source is frontend", source);
  } else if (source === "backend") {
    // Handle backend request
    console.log("source is backend", source);
  } else {
    // Handle other requests
  }

  next();
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// app.get("https://www.amazon.in/s?k=umbrella", scrapeAndStoreProduct);
app.listen(process.env.PORT, function () {
  console.log(
    `server is running on ${process.env.DEV_MODE} port number", ${process.env.PORT}`
  );
});