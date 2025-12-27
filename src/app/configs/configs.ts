import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Global, SharedModule } from '@shared';
import { ConfigsApi } from '@shared/apis/configs-api';

import { Layout } from '../__layout/layout';

@Component({
  standalone: true,
  imports: [SharedModule, Layout],
  selector: 'app-configs',
  templateUrl: './configs.html'
})
export class Configs implements OnInit {
  global = inject(Global);
  configs = inject(ConfigsApi);

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.configs
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log(data);
      });
  }
}
