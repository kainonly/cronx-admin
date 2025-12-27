import { Injectable } from '@angular/core';

import { Scheduler } from '@shared/models/scheduler';

import { Api } from '.';

@Injectable({ providedIn: 'root' })
export class SchedulersApi extends Api<Scheduler> {
  protected override collection = 'schedulers';
}
