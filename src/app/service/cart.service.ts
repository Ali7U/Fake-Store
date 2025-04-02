import { Injectable } from '@angular/core';
import { Product } from '../main/interfaces/products';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService { 
  private cartItems: CartItem[] = [];
  private cartTotal = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  cartTotal$ = this.cartTotal.asObservable();
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCartTotal();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.updateCartTotal();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      this.updateCartTotal();
    }
  }

  private updateCartTotal() {
    const total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    this.cartTotal.next(total);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartTotal();
  }
  constructor() {}
}
