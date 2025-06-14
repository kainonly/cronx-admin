import { Component, inject, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

import { ShareModule } from '@common/share.module';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [ShareModule],
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  private icon = inject(NzIconService);

  ngOnInit(): void {
    this.icon.changeAssetsSource(environment.cdn);
  }
}
