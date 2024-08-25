import asyncHandler from "express-async-handler";
import Foods from "../models/food.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const addFoods = asyncHandler(async (req: any, res: any) => {
  try {
    if (!req.fields || !req.files) {
      return res.status(400).json({ error: "No data received" });
    }

    const { name, description, price, tags } = req.fields;

    // Validate required fields
    if (!name) return res.json({ error: "Name is required" });
    if (!description) return res.json({ error: "Description is required" });
    if (!price) return res.json({ error: "Price is required" });
    if (!tags) return res.json({ error: "Tags are required" });

    const imagePath =
      req.files && req.files.image
        ? `/uploads/${req.files.image.path
            .replace(/\\/g, "/")
            .split("/")
            .pop()}`
        : undefined;

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const image = imagePath ? `${baseUrl}${imagePath}` : undefined;

    const food = new Foods({ ...req.fields, image });
    await food.save();
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(HTTP_BAD_REQUEST).json(error);
  }
});

const updateFoods = asyncHandler(async (req: any, res: any) => {
  try {
    if (!req.fields || !req.files) {
      return res.status(400).json({ error: "No data received" });
    }

    const { name, description, price, tags } = req.fields;

    // Validate required fields
    if (!name) return res.json({ error: "Name is required" });
    if (!description) return res.json({ error: "Description is required" });
    if (!price) return res.json({ error: "Price is required" });
    if (!tags) return res.json({ error: "Tags are required" });

    const imagePath =
      req.files && req.files.image
        ? `/uploads/${req.files.image.path
            .replace(/\\/g, "/")
            .split("/")
            .pop()}`
        : undefined;

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const image = imagePath ? `${baseUrl}${imagePath}` : undefined;

    const food = await Foods.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, image },
      { new: true }
    );
    await food!.save();
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(HTTP_BAD_REQUEST).json(error);
  }
});

const getAllFoods = asyncHandler(async (req, res) => {
  const foods = await Foods.find({});
  res.send(foods);
});

const searchTerm = asyncHandler(async (req, res) => {
  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const foods = await Foods.find({ name: { $regex: searchRegex } });
  res.send(foods);
});

const getAllTags = asyncHandler(async (req, res) => {
  const tags = await Foods.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", count: "$count" } },
  ]).sort({ count: -1 }); //-1 descending

  const all = {
    name: "All",
    count: await Foods.countDocuments(),
  };

  tags.unshift(all);
  res.send(tags);
});

const searchedTags = asyncHandler(async (req, res) => {
  const foods = await Foods.find({ tags: req.params.tagName });
  res.send(foods);
});

const foodById = asyncHandler(async (req, res) => {
  const food = await Foods.findById(req.params.foodId);
  res.send(food);
});

const deleteFoodById = asyncHandler(async (req, res) => {
  try {
    const food = await Foods.findByIdAndDelete(req.params.id);
    res.json(food);
  } catch (error) {
    res.status(HTTP_BAD_REQUEST).json({ error: "Deletion Failed!" });
  }
});

export {
  addFoods,
  getAllFoods,
  searchTerm,
  getAllTags,
  searchedTags,
  foodById,
  updateFoods,
  deleteFoodById
};
