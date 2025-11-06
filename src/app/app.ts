import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
})
export class App implements OnInit {
  private destroyRef = inject(DestroyRef);
  private storage = inject(StorageMap);

  ngOnInit(): void {
    this.storage.clear().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
