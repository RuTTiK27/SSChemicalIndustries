import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.message = 'Login successful!';
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.message = `Error: ${error.message}`;
      });
  }

}
