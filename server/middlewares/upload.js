// // middlewares/upload.js
// import multer from "multer";
// import path from "path";

// // Storage config for Multer (local temp, Cloudinary ke liye)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // ensure "uploads" folder exist
//   },
//   filename: function (req, file, cb) {
//     // unique name = timestamp-originalname
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // File filter (sirf images)
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only .jpg, .jpeg, .png format allowed!"), false);
//   }
// };

// // Multer upload instance
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 20 * 1024 * 1024 }, // 5MB max
// });

// export default upload;



import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "menu_images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;
