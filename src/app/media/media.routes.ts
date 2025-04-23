import { Routes } from '@angular/router';

import { XgplayerComponent } from './xgplayer/xgplayer.component';

export const mediaRoutes: Routes = [
  { path: 'xgplayer', component: XgplayerComponent },
  { path: '', redirectTo: 'xgplayer', pathMatch: 'full' }
];
