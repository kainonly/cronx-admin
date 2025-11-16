import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Global } from '@shared';

export const appGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const global = inject(Global);

  return global.getContext().pipe(
    map(v => {
      if (!v) {
        router.navigate(['/login']);
      }
      return true;
    })
  );
};
