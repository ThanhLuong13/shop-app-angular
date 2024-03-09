import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from './product.service';
import { ReturnStatement } from '@angular/compiler';
import { TokenService } from './token.service';
import { UserResponse } from '../responses/user/userResponse';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Map<number, number> = new Map<number, number>()
  constructor(private productService: ProductService, private tokenService: TokenService) {
    debugger
    this.refreshCart()
  }

  getCartKey(): string {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: UserResponse = JSON.parse(userJson);
      return `cart_${user.id}`
    } else {
      return '';
    }
  }

  refreshCart(): void {
    debugger
    const storedCart = localStorage.getItem(this.getCartKey())
    if (storedCart != null) {
      this.cart = new Map(JSON.parse(storedCart))
    } else {
      this.cart = new Map<number, number>();
    }
  }

  addToCart(productId: number, quantity: number): void {
    debugger
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.saveCartToLocalStorage();
  }

  getCart(): Map<number, number> {
    debugger
    if (this.cart) {
      return this.cart;
    }
    return new Map<number, number>();
  }

  setCart(cart: Map<number, number>): void {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage()
  }

  clearCart(): void {
    this.cart.clear()
    this.saveCartToLocalStorage()
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }
}

