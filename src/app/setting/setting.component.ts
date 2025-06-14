import { Component } from '@angular/core';

import { ShareModule } from '@common/share.module';

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent {}
