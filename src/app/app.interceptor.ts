import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { EXTERNAL, Global } from '@shared';

export function appInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.context.get(EXTERNAL)) {
    return next(req);
  }
  const router = inject(Router);
  const message = inject(NzMessageService);
  const modal = inject(NzModalService);
  const global = inject(Global);
  return global.getContext().pipe(
    switchMap(v => {
      return next(
        req.clone({
          ...req,
          ...{
            url: `${v!.endpoint}/${req.url}`,
            headers: new HttpHeaders({ Authorization: `Bearer ${v!.token}` })
          }
        })
      ).pipe(
        catchError(e => {
          switch (e.status) {
            case 401:
              modal.closeAll();
              message.error(`Login expired. Please re-log in.`);
              router.navigateByUrl('/login').then();
              break;
            case 403:
              message.error(`Have no permission to access.`);
              break;
            case 500:
            case 503:
              if (![''].includes(e.error.code)) {
                message.error(`Server busy. Please try again later.`);
              }
              break;
          }
          return throwError(() => e);
        })
      );
    })
  );
}
