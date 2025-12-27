import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SharedModule } from '@shared';

import { appInterceptor } from './app.interceptor';
import { routes } from './app.routes';

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([appInterceptor])),
    provideNzI18n(zh_CN),
    provideAnimationsAsync(),
    provideNzConfig({
      notification: { nzPlacement: 'bottomRight' },
      card: { nzBordered: false },
      table: { nzSize: 'middle', nzBordered: true }
    }),
    provideRouter(routes),
    importProvidersFrom(SharedModule, NzMessageService, NzNotificationService)
  ]
};
