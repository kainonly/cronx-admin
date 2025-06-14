import { Component } from '@angular/core';

import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent {}
