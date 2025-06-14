import { Component, inject, OnInit } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule, NzBreadCrumbModule],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  private drawer = inject(NzDrawerService);

  ngOnInit(): void {}
}
