import { Component, OnInit } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule, NzBreadCrumbModule],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {}
}
