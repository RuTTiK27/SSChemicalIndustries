import { Injectable } from '@angular/core';
import { Firestore, doc,collection, getDocs, addDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Auth,User  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

  async getCartItems(): Promise<any[]> {
    const userId = localStorage.getItem('uid');
    if (userId) {
      const cartRef = collection(this.firestore, `users/${userId}/cart`);
      const cartSnapshot = await getDocs(cartRef);
      return cartSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } else {
      console.error('No user ID found in localStorage');
      return [];
    }
  }

  async addToCart(product: any): Promise<string> {
    const userId = localStorage.getItem('uid');
    if (userId) {
      const cartRef = collection(this.firestore, `users/${userId}/cart`);
      const q = query(cartRef, where('id', '==', product.id));
      const cartSnapshot = await getDocs(q);
  
      if (!cartSnapshot.empty) {
        console.log('Product already in cart!');
        return 'Item already added to cart'; // Return message if item exists
      }
  
      // Add the product to the cart
      await addDoc(cartRef, product);
      console.log(`Product added to cart: ${product.name}`);
      return 'Item added to cart'; // Return success message
    } else {
      console.error('Cannot add item: No user ID found in localStorage');
      return 'User not logged in'; // Return error message for unauthenticated users
    }
  }
  
  

  // Remove product from the cart
  async removeFromCart(productId: string): Promise<void> {
    
    const userId = localStorage.getItem('uid');
    console.log('Attempting to remove product with ID:', productId);
  
    if (userId) {
      const docInstance = doc(this.firestore,`users/${userId}/cart`,productId);
      deleteDoc(docInstance);
      console .log("Deleted product : ", productId)
    } else {
      console.error('Cannot remove item: No user ID found in localStorage');
    }
  }
  
  

  // Clear all cart items
  async clearCart(): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const cartRef = collection(this.firestore, `users/${user.uid}/cart`);
      const cartSnapshot = await getDocs(cartRef);
      cartSnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref); // Clear all cart items
      });
    }
  }
}
