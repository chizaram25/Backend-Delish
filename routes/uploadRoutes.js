const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/uploadControllers");
const upload = require("../middleware/uploadMiddleware");


router.post("/uploadFile", upload.single("file"), uploadFile);


module.exports = router;