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
app.use(cors());
app.use(morgan("common"));

const categoryCoffeeShopRouter = require("./routes/categoryCoffee");
const coffeeShopRouter = require("./routes/coffeeShop");
const promotionRouter = require("./routes/promotion");
const commentRouter = require("./routes/comment");

// Routes
app.use("/api/category-coffee", categoryCoffeeShopRouter);
app.use("/api/coffee", coffeeShopRouter);
app.use("/api/promotion", promotionRouter);
app.use("/api/comment", commentRouter);

app.listen(8000, () => {
  console.log("K-go: ", "Server is running ...");
});
