import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load cart items from Firebase
  async loadCartItems() {
    this.cartItems = await this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
    // Ensure price is valid and a number
    const itemPrice = item.price ? parseFloat(item.price) : 0;
    return sum + itemPrice;
  }, 0);
}

  // Remove item from cart
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).then(() => {
      console.log(`Product with ID: ${productId} removed from cart`);
      this.loadCartItems(); // Reload cart items after removing the item
    }).catch((error) => {
      console.error('Failed to remove item:', error);
      alert('Something went wrong. Please try again.');
    });
  }
  

  // Place order (this can later be extended to handle checkout)
  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Please add items to the cart.');
      return;
    }

    // Navigate to the Order confirmation page
    this.router.navigate(['/place-order']);
  }
}
