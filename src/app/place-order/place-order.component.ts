import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  cartItems: any[] = [];
  totalAmount: number = 0;


  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load cart items from Firebase
  async loadCartItems() {
    this.cartItems = await this.cartService.getCartItems();
    this.calculateTotalAmount();
  }

  // Calculate total cart amount
  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.price || 0), 0); // Assuming price is part of product data
  }

  // Confirm the order
  confirmOrder() {
    // You can integrate payment or order processing here
    alert('Order confirmed!');
    this.cartService.clearCart(); // Clear the cart after order
    this.router.navigate(['/']); // Navigate back to the homepage
  }

}
