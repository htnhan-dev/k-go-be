const router = require("express").Router();
const upload = require("../middleware/upload");
const reviewController = require("../controllers/reviewController");

router.post("/add", upload.any(), reviewController.addReview);

router.get("/like/:id", reviewController.likeReview);

router.get("/likeprofile/:id", reviewController.likeProfileReview);

router.get("/unlike/:id", reviewController.unLikeReview);

router.get("/unlikeprofile/:id", reviewController.unLikeProfileReview);

router.post("/comment", reviewController.commentReview);

router.post("/commentprofile", reviewController.commentProfileReview);

router.get("/getall", reviewController.getAllReview);

router.get("/user-review/:id", reviewController.userReview);

router.get("/place/:id", reviewController.placeReview);

module.exports = router;
