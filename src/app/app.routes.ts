import { Routes } from '@angular/router';
import { RegisterForm } from './components/register-form/register-form';
import { LoginForm } from './components/login-form/login-form';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterForm,
      },
      {
        path: 'login',
        component: LoginForm,
      },
    ],
  },
];
