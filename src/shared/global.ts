import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { JSONSchema, StorageMap } from '@ngx-pwa/local-storage';
import { Api } from '@shared/apis';
import { Basic, NodeOption, R, SearchOption } from '@shared/models';

import { EXTERNAL } from './public-api';
import { Model } from './utils/model';

@Injectable({ providedIn: 'root' })
export class Global {
  private http = inject(HttpClient);
  private storage = inject(StorageMap);
  private modal = inject(NzModalService);

  private schema: JSONSchema = {
    type: 'object',
    required: ['endpoint', 'token'],
    properties: { endpoint: { type: 'string' }, token: { type: 'string' } }
  };

  setModel<T extends Basic, S extends SearchOption>(storageKey: string, api: Api<T>, search: S): Model<T, S> {
    return new Model<T, S>(storageKey, this.storage, api, search);
  }

  connect(option: NodeOption): Observable<R> {
    return this.http.get(option.endpoint, {
      headers: { Authorization: `Bearer ${option.token}` },
      context: new HttpContext().set(EXTERNAL, true)
    });
  }

  setContext(option: NodeOption): void {
    this.storage.set('context', option, this.schema).subscribe(x => {
      console.log(x);
    });
  }

  getContext(): Observable<NodeOption | undefined> {
    return this.storage.get<NodeOption>('context', this.schema);
  }
}
