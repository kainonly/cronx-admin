import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Global, Loading, SharedModule } from '@shared';
import { Any } from '@shared/models';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-login',
  templateUrl: './login.html'
})
export class Login {
  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  form: FormGroup = this.fb.group({
    endpoint: ['http://localhost:9000', [Validators.required]],
    token: [null, [Validators.required]]
  });
  loading = new Loading();

  submit(data: Any): void {
    this.loading.start();
    this.global
      .connect(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.end();
          this.global.setContext(data);
          this.router.navigateByUrl('/schedulers');
          this.notification.success(`接入成功`, `🚀正在加载页面...`);
        },
        error: () => {
          this.loading.end();
          this.notification.error(`接入失败`, `❌临时令牌不一致或已失效`);
        }
      });
  }
}
