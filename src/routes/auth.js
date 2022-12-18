const router = require("express").Router();
const authController = require("../controllers/authController");
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh", authController.requestRefreshToken);
router.put("/setAvatar/:id", authController.setAvatar);
router.get("/", authController.getUser);
module.exports = router;
