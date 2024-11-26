import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SS Chemical Industries';
  isAuthenticated: boolean = false;  // Track login state
  user: User | null = null; // Store user information

  constructor(private auth: Auth, private authService: AuthService) {}

  ngOnInit(): void {
    // Listen to authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      this.isAuthenticated = !!user; // Set isAuthenticated to true if user exists
    });
    
  }

  // Call logout function from AuthService
  logout() {
    this.authService.logout();
  }
}
