import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential,signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth)
  {

  }

  // Register a new user
  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

 // Login method
 async login(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    if (user) {
      // Save the user ID to localStorage
      localStorage.setItem('uid', user.uid);
      console.log('User ID saved to localStorage:', user.uid);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Logout method
async logout(): Promise<void> {
  try {
    await signOut(this.auth);

    // Remove the user ID from localStorage
    localStorage.removeItem('uid');
    console.log('User logged out and uid removed from localStorage');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}
}
