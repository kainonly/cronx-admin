import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import en from '@angular/common/locales/en';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SharedModule } from '@shared';

import { appInterceptor } from './app.interceptor';
import { routes } from './app.routes';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([appInterceptor])),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    provideNzConfig({
      notification: { nzPlacement: 'bottomRight' },
      card: { nzBordered: false },
      table: { nzSize: 'middle', nzBordered: true }
    }),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(SharedModule, NzMessageService, NzNotificationService)
  ]
};
