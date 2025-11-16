import { Routes } from '@angular/router';

import { appGuard } from './app.guard';
import { Configs } from './configs/configs';
import { Login } from './login/login';
import { Schedulers } from './schedulers/schedulers';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    canActivate: [appGuard],
    children: [
      { path: 'schedulers', component: Schedulers },
      { path: 'configs', component: Configs },
      { path: '', redirectTo: '/schedulers', pathMatch: 'full' }
    ]
  }
];
