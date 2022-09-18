const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
//Connect MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connect Success MongoDB!");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use("/uploads", express.static("uploads"));

// const categoryCoffeeShopRouter = require("./routes/categoryCoffee");
// const coffeeShopRouter = require("./routes/coffeeShop");
// const promotionRouter = require("./routes/promotion");
// const commentRouter = require("./routes/comment");

// Routes
// app.use("/api/category-coffee", categoryCoffeeShopRouter);
// app.use("/api/coffee", coffeeShopRouter);
// app.use("/api/promotion", promotionRouter);
// app.use("/api/comment", commentRouter);

//authentication
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

//place
const coffeeShopRouter = require("./routes/coffeeShop");
app.use("/api/place", coffeeShopRouter);

//Review
const reviewRouter = require("./routes/review");
app.use("/api/review", reviewRouter);

// ------------------------- ADMIN
// District
const districtRouter = require("./routes/district");
app.use("/api/district", districtRouter);
// Category
const categoryRouter = require("./routes/category");
app.use("/api/category", categoryRouter);
// Promo
const promoRouter = require("./routes/promo");
app.use("/api/promo", promoRouter);

app.listen(8000, () => {
  console.log("K-go: ", "Server is running ...");
});
