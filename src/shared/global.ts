import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Basic, R, SearchOption } from '@shared/models';

import { EXTERNAL } from './public-api';
import { Model } from './utils/model';

interface ConnectDto {
  endpoint: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class Global {
  private http = inject(HttpClient);
  private storage = inject(StorageMap);
  private modal = inject(NzModalService);

  setModel<T extends Basic, S extends SearchOption>(storageKey: string, api: Api<T>, search: S): Model<T, S> {
    return new Model<T, S>(storageKey, this.storage, api, search);
  }

  connect(dto: ConnectDto): Observable<R> {
    return this.http.get(dto.endpoint, {
      headers: { Authorization: `Bearer ${dto.token}` },
      context: new HttpContext().set(EXTERNAL, true)
    });
  }
}
