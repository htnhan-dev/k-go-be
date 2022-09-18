const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/svg+xml" ||
      file.mimetype === "image/webp"
    ) {
      callback(null, true);
    } else {
      console.log("Support only file png & jpg");
      callback(null, false);
    }
  },
  limits: 1024 * 1024 * 2,
});

module.exports = upload;
