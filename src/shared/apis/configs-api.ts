import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Scheduler } from '@shared/models/scheduler';

@Injectable({ providedIn: 'root' })
export class ConfigsApi {
  http = inject(HttpClient);

  list(): Observable<Scheduler[]> {
    return this.http.get<Scheduler[]>('/configs');
  }
}
