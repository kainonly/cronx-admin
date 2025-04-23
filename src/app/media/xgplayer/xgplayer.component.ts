import { Component } from '@angular/core';

import { AppModule } from '@share';
import { NgxXgplayerComponent } from 'ngx-xgplayer';

@Component({
  standalone: true,
  selector: 'app-media-xgplayer',
  imports: [AppModule, NgxXgplayerComponent],
  template: `
    <nz-card>
      <ngx-player></ngx-player>
    </nz-card>
  `
})
export class XgplayerComponent {}
