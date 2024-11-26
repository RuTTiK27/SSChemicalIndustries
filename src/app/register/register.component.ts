import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService
      .register(this.email, this.password)
      .then(() => {
        this.message = 'Registration successful!';
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.message = `Error: ${error.message}`;
      });
  }
}
