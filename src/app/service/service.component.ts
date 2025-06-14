import { Component } from '@angular/core';

import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent {}
