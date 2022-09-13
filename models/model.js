const mongoose = require("mongoose");

// const categoryCoffeeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   thumnail: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: Boolean,
//     required: true,
//   },
// });

// const CoffeeShopSchema = new mongoose.Schema({
//   category_cofeeeshop_id: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   info: {
//     type: [],
//   },
//   services: {
//     type: [],
//   },
//   comment_id: {
//     type: String,
//   },
//   rating: {
//     type: Number,
//   },
//   libraryImg: {
//     type: [],
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//   },
//   status: {
//     type: Boolean,
//   },
// });

// const PromotionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   coffeeshop_id: {
//     type: String,
//     required: true,
//   },
//   voucher: {
//     type: String,
//     required: true,
//   },
//   created_time: {
//     type: Date,
//   },
// });

// const CommentSchema = new mongoose.Schema({
//   user_id: {
//     type: String,
//     required: true,
//   },
//   comment_parent_id: {
//     type: String,
//   },
//   comment_chilldren_id: {
//     type: String,
//   },
//   comment_parent_content: {
//     type: String,
//   },
//   comment_chilldren_content: {
//     type: String,
//   },
//   likes: {
//     type: Number,
//   },
//   created_time: {
//     type: Date,
//   },
//   status: {
//     type: Boolean,
//   },
// });

// let CategoryCoffee = mongoose.model("CategoryCoffee", categoryCoffeeSchema);

// let CoffeeShop = mongoose.model("CoffeeShop", CoffeeShopSchema);

// let Promotion = mongoose.model("Promotion", PromotionSchema);

// let Comment = mongoose.model("Comment", CommentSchema);

// module.exports = { CategoryCoffee, CoffeeShop, Promotion, Comment };
