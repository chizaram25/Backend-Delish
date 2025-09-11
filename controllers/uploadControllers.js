const cloudinary = require("../config/cloudinaryConfig");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
        resource_type: "auto",
      });

      res.status(200).json({
        message: "File uploaded successfully",
        url: result.secure_url,
        public_id: result.public_id,
      });
    } else {
      res.status(200).json({
        message: "File uploaded successfully",
        url: req.file.url || req.file.secure_url,
        public_id: req.file.public_id,
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};
module.exports = {
  uploadFile,
};
