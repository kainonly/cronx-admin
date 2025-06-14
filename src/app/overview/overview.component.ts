import { Component } from '@angular/core';

import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {}
