import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Schedulers } from './schedulers/schedulers';
import { Storage } from './storage/storage';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    children: [
      { path: 'schedulers', component: Schedulers },
      { path: 'storage', component: Storage },
      { path: '', redirectTo: '/schedulers', pathMatch: 'full' }
    ]
  }
];
