import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  importProvidersFrom,
  isDevMode
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ShareModule } from '@common/share.module';

import { routes } from './app.routes';

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(ShareModule),
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideNzI18n(zh_CN),
    provideNzConfig({
      notification: { nzPlacement: 'bottomRight' },
      card: { nzBordered: false },
      table: { nzSize: 'small', nzBordered: true }
    }),
    NzMessageService,
    NzNotificationService,
    provideHttpClient(
      withFetch(),
      withInterceptors([]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    provideRouter(routes, withHashLocation(), withViewTransitions()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:10000'
    })
  ]
};
