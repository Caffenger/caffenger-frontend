import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth-service/auth';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
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
    console.log(`form submitted with data: `, {
      email: this.registerForm.get('email'),
      password: this.registerForm.get('password'),
    });
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
