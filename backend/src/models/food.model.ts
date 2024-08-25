import { model, Schema } from "mongoose";

export interface Food {
  id: string;
  name: string;
  price: number;
  ratings: number;
  tags: string;
  description: string;
  image: string;
}

export const FoodSchema = new Schema<Food>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number },
    tags: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Foods = model<Food>("food", FoodSchema);
export default Foods;
