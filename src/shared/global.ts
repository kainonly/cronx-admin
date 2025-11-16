import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Basic, R, SearchOption } from '@shared/models';

import { EXTERNAL } from './public-api';
import { Model } from './utils/model';

interface ConnectOption {
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

  connect(opt: ConnectOption): Observable<R> {
    return this.http.get(opt.endpoint, {
      headers: { Authorization: `Bearer ${opt.token}` },
      context: new HttpContext().set(EXTERNAL, true)
    });
  }

  setEndpoint(data: ConnectOption): void {
    sessionStorage.setItem('endpoint', data.endpoint);
    sessionStorage.setItem('token', data.token);
    this.storage.get(`endpoints`).subscribe(raw => {
      console.log(raw);
    });
  }
}
