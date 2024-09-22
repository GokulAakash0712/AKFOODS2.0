import asyncHandler from "express-async-handler";
import Foods from "../models/food.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { error } from "console";

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

const updateFoodRating = asyncHandler(async (req:any, res:any) => {
  try {
    const { foodId } = req.params;
    const { rating } = req.body;

    //check if the rating is provided
    if (!rating) {
      return res.status(HTTP_BAD_REQUEST).json({error:"Rating is required"})
    }

    //validate the rating value 
    if (rating < 0 || rating > 5) {
      return res.status(HTTP_BAD_REQUEST).json({ error: "Rating must be between 0 and 5" });
    }

    //find the food by id
    const food = await Foods.findById(foodId);

    if (!food) {
      return res.status(HTTP_BAD_REQUEST).json({ error: "Food not found" });
    }

    //add the new rating to the array of individual rating
    food.individualRatings.push(rating);

    //update the ratings count
    food.ratingsCount = food.individualRatings.length;

    //recalculate the average rating
    const totalRatings = food.individualRatings.reduce((acc, curr) => acc + curr, 0);
    food.ratings = totalRatings / food.ratingsCount;

    //save the update food item
    await food.save();

    res.json(food);
  } catch (error) {
    res.status(HTTP_BAD_REQUEST).json({ error: "Failed to update rating" });
  }
})

export {
  addFoods,
  getAllFoods,
  searchTerm,
  getAllTags,
  searchedTags,
  foodById,
  updateFoods,
  deleteFoodById,
  updateFoodRating
};
