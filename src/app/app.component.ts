import { Component } from '@angular/core';
import { AppNavigationService } from './features/common/services';

@Component({
  selector: 'rp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public appNavigationService: AppNavigationService) {
  }
}
