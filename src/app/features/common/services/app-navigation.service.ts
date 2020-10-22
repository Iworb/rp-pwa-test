import { Injectable } from '@angular/core';

@Injectable()
export class AppNavigationService {
  title = 'Rep Portal PWA';
  sidenavOpened = false;

  sidenavToggle(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
