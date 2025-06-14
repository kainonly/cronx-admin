import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private http = inject(HttpClient);
  private modal = inject(NzModalService);
}
