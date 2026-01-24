import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../services/auth-service/auth';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    const userData = {
      email: this.loginForm.get('email')?.value as string,
      password: this.loginForm.get('password')?.value as string,
    };

    if (userData) {
      (await this.authService.login(userData)).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          alert(`${response.message}`);
        },
        error: (err) => {
          alert(err);
        },
      });
    }
  }
}
