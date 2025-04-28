import { Component } from '@angular/core';

import { ShareModule } from '@common/share.module';

@Component({
  selector: 'app-root',
  imports: [ShareModule],
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent {}
