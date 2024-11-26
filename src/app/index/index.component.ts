import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  products = [
    {
      id: '1',
      name: 'Sulfuric Acid',
      description: 'Widely used in fertilizers, industrial cleaning, and chemical synthesis.',
      image: 'sulfuric-acid.jpg',
      price: 25.0, // Add price in your desired currency
    },
    {
      id: '2',
      name: 'Sodium Hydroxide (Caustic Soda)',
      description: 'Essential for paper manufacturing, detergents, and water treatment processes.',
      image: 'sodium-hydroxide.jpg',
      price: 15.5,
    },
    {
      id: '3',
      name: 'Hydrochloric Acid',
      description: 'Used in steel processing, food production, and cleaning agents.',
      image: 'hydrochloric-acid.jpg',
      price: 18.75,
    },
    {
      id: '4',
      name: 'Fertilizers',
      description: 'High-quality fertilizers to enhance soil health and agricultural yield.',
      image: 'fertilizers.jpg',
      price: 12.0,
    },
    {
      id: '5',
      name: 'Adhesives',
      description: 'Reliable adhesives for industrial and consumer applications.',
      image: 'adhesives.jpg',
      price: 8.99,
    },
    {
      id: '6',
      name: 'Coatings',
      description: 'Durable coatings for protecting surfaces and enhancing aesthetics.',
      image: 'coatings.png',
      price: 19.5,
    },
  ];
  

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load cart items from Firebase
  async loadCartItems() {
    this.cartItems = await this.cartService.getCartItems();
  }

  // Add product to cart
  addToCart(product: any) {
    this.cartService.addToCart(product).then((message) => {
      alert(message); // Display the returned message as an alert
      if (message === 'Item added to cart') {
        this.loadCartItems(); // Reload cart items only if a new item is added
      }
    }).catch((error) => {
      console.error('Failed to add item:', error);
      alert('Something went wrong. Please try again.');
    });
  }
  

  // Check if the product is already in the cart
  isInCart(productId: string): boolean {
    return this.cartItems.some(item => item.id === productId);
  }

}
