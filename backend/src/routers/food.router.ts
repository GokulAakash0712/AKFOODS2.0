import express from "express";
import formidable from "express-formidable";
import multer from "multer";
import path from "path";
const router = express.Router();

// Create storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// File extension filter
const fileFilter = (req: any, file: any, cb: any) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });

import {
  addFoods,
  deleteFoodById,
  foodById,
  getAllFoods,
  getAllTags,
  searchedTags,
  searchTerm,
  updateFoodRating,
  updateFoods,
} from "../controllers/foods.controller";

router.route("/createfoods").post(
  formidable({
    uploadDir: "uploads", // Directory to save uploaded files
    keepExtensions: true, // Keep file extensions
  }),
  addFoods
);

router.route("/:id").put(
  formidable({
    uploadDir: "uploads", // Directory to save uploaded files
    keepExtensions: true, // Keep file extensions
  }),
  updateFoods
);

router.route("/:id").delete(deleteFoodById);

router.route("/allFoods").get(getAllFoods);
router.route("/search/:searchTerm").get(searchTerm);
router.route("/tags").get(getAllTags);
router.route("/tag/:tagName").get(searchedTags);
router.route("/:foodId").get(foodById);
router.route("/:foodId/rating").put(updateFoodRating);

export default router;
