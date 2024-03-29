const authController = require("../controllers/authController");

const router = require("express").Router();

const upload = require("../middleware/upload");

// Dang ky
router.post("/register", authController.registerUser);
//Dang nhap
router.post("/login", authController.loginUser);
// Cap nhat ten nguoi dung
router.put("/update-name", authController.updateName);
//Cap nhat gioi tinh
router.put("/update-sex", authController.updateSex);
//ca nhat mang xa hoi
router.put("/update-social", authController.updateSocial);

//Get chi tiet 1 user
router.get("/detail-user/:id", authController.getDetailUser);
//Cap nhat email
router.put("/update-email", authController.updateEmail);
//Cap nhat so dien thoai
router.put("/update-phone", authController.updatePhone);
//Cap nhat mat khau
router.put("/update-password", authController.updatePassword);
//Cap nhat avartar
router.put(
  "/update-avatar",
  upload.single("avatar"),
  authController.updateAvatar
);

router.get("/getall", authController.getAllUser);

router.get("/delete/:id", authController.deleteUser);

router.get("/approve/:id", authController.approveUser);

router.post("/follow", authController.followUser);

router.post("/unfollow", authController.unFollowUser);

router.get("/get-notification", authController.getNotification);

router.get("/read-notification", authController.readNotification);

module.exports = router;
