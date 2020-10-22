import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppCommonService, AppNavigationService } from '../../services/index';
import { combineLatestMap } from '../../utils';

@Component({
  selector: 'rp-app-app-bar',
  templateUrl: './app-app-bar.component.html',
  styleUrls: ['./app-app-bar.component.scss']
})
export class AppAppBarComponent implements OnInit {

  ctx$: Observable<{
    isOnline: boolean,
    isManual: boolean
  }>;

  constructor(
    private appCommonService: AppCommonService,
    public appNavigationService: AppNavigationService
  ) {
    this.ctx$ = combineLatestMap({
      isOnline: this.appCommonService.isOnline$,
      isManual: this.appCommonService.isManual$,
    });
  }

  ngOnInit(): void {
  }

  toggleManual(): void {
    this.appCommonService.toggleManual();
  }

}
