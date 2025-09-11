const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers.js");
const protect = require("../middleware/authMiddleware.js");


const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);


router.post("/forgotPassword", forgotPassword); 
router.post("/resetPassword", resetPassword);

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
}); 

module.exports = router;
