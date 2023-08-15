const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
//Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, () => {
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

//Chat
const chatRouter = require("./routes/chat");
app.use("/api/chat", chatRouter);

// Messsage
const messageRouter = require("./routes/message");
app.use("/api/message", messageRouter);

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
// Cate blog
const categoryBlogRouter = require("./routes/categoryBlog");
app.use("/api/categoryblog", categoryBlogRouter);
// BLog
const blogRouter = require("./routes/blog");
app.use("/api/blog", blogRouter);

// socket IO message chat
const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    console.log("activeUsers: ", activeUsers);
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    console.log("receiverId: ", receiverId);
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("user: ", user);

    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

//start server heroku
const PORT = process.env.PORT || 8000;
app.listen(PORT, "192.168.99.104", () => {
  console.log("K-go: ", "Server is running ...");
});
