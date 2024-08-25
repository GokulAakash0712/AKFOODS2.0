import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { Cart } from '../../../../shared/models/Cart';
import { CartItem } from '../../../../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  cart!: Cart;

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
  // changeQuantity(cartItem: CartItem, newQuantity: number) {
  //   this.cartService.changeQuantity(cartItem.food.id, newQuantity);
  // }
}
