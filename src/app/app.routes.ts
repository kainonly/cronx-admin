import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Schedulers } from './schedulers/schedulers';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    children: [
      { path: 'schedulers', component: Schedulers },
      { path: '', redirectTo: '/schedulers', pathMatch: 'full' }
    ]
  }
];
