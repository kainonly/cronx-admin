import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { NzIconService } from 'ng-zorro-antd/icon';

import { fromPromise } from 'rxjs/internal/observable/innerFrom';

import { environment } from '@env';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  private icon = inject(NzIconService);
  private swUpdate = inject(SwUpdate);

  ngOnInit(): void {
    this.checkUpdate();
    this.icon.changeAssetsSource(environment.cdn);
  }

  checkUpdate(): void {
    if (this.swUpdate.isEnabled) {
      fromPromise(this.swUpdate.checkForUpdate()).subscribe(evt => {
        if (evt && confirm('有新的版本可用，是否更新？')) {
          window.location.reload();
        }
      });
    }
  }
}
