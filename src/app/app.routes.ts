import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':team',
    loadComponent: () => import('./__layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'schedule',
        loadComponent: () => import('./schedule/schedule.component').then(m => m.ScheduleComponent)
      },
      {
        path: 'service',
        loadComponent: () => import('./service/service.component').then(m => m.ServiceComponent)
      },
      {
        path: 'resource',
        loadComponent: () => import('./resource/resource.component').then(m => m.ResourceComponent)
      },
      {
        path: 'setting',
        loadComponent: () => import('./setting/setting.component').then(m => m.SettingComponent)
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];
