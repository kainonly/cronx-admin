import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withViewTransitions } from '@angular/router';
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
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    provideAnimationsAsync(),
    provideNzI18n(zh_CN),
    provideNzConfig({
      notification: { nzPlacement: 'bottomRight' },
      card: { nzBordered: false },
      table: { nzSize: 'middle', nzBordered: true }
    }),
    NzMessageService,
    NzNotificationService,
    provideRouter(routes, withViewTransitions())
  ]
};
