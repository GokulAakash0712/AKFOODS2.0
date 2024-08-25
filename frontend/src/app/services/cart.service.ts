import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';
import { UserService } from './user.service'; // Import UserService
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart!: Cart;
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService
  ) {
    // Subscribe to user changes
    this.userService.userObservable.subscribe((user) => {
      this.loadCartForUser(user);
    });

    // Load the cart for the current user
    this.loadCartForUser(this.userService.currentUser);
  }

  private loadCartForUser(user: User) {
    this.cart = this.getCartFromLocalStorage(user.id);
    this.cartSubject.next(this.cart);
  }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) {
      return;
    } else {
      this.cart.items.push(new CartItem(food));
      this.updateCart();
    }
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
    this.updateCart();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.updateCart();
  }

  clearCart() {
    this.cart = new Cart();
    this.updateCart();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private updateCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cart.totalPrice = this.cart.items.reduce(
        (prevSum, currentItem) => prevSum + currentItem.price,
        0
      );
      this.cart.totalCount = this.cart.items.reduce(
        (prevSum, currentItem) => prevSum + currentItem.quantity,
        0
      );
      this.setCartToLocalStorage(this.userService.currentUser.id);

      // Notify subscribers
      this.cartSubject.next(this.cart);
    }
  }

  private setCartToLocalStorage(userId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = JSON.stringify(this.cart);
      localStorage.setItem(`AKFOODSCart_${userId}`, cartJson);
    }
  }

  private getCartFromLocalStorage(userId: string): Cart {
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = localStorage.getItem(`AKFOODSCart_${userId}`);
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
    return new Cart();
  }
}
