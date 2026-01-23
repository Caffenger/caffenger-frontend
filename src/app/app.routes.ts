import { Routes } from '@angular/router';
import { RegisterForm } from './components/register-form/register-form';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterForm,
      },
    ],
  },
];
