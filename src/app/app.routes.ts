import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./__layout/layout.component').then(m => m.LayoutComponent),
    children: []
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
