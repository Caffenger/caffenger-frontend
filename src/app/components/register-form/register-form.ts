import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth-service/auth';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  private authService = inject(Auth);
  private formBuilder = inject(FormBuilder);

  // formGroup definition:
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    const userData = {
      email: this.registerForm.get('email')?.value as string,
      password: this.registerForm.get('password')?.value as string,
    };
    if (userData)
      (await this.authService.register(userData)).subscribe({
        next: (response) => {
          console.log('Registered succesfully', response);
        },
        error: (err) => {
          console.log('Registration failed', err);
        },
      });
  }
}
