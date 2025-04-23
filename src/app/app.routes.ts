import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { mediaRoutes } from './media/media.routes';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'media',
    children: [...mediaRoutes]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
