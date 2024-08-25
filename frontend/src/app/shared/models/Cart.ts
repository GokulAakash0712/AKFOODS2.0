import { CartItem } from "./CartItem";

export class Cart {
  [x: string]: any;
  items: CartItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}
