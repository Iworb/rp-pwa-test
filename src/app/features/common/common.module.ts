import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppAppBarComponent } from './components/index';
import { AppCommonService, AppNavigationService, WINDOW_PROVIDERS } from './services/index';
import { AppCommonEffects, appCommonReducer } from './store/index';

@NgModule({
  declarations: [AppAppBarComponent],
  exports: [AppAppBarComponent],
  imports: [
    StoreModule.forFeature('common', appCommonReducer),
    EffectsModule.forFeature([AppCommonEffects]),
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
    AppCommonService
  ]
})
export class AppCommonModule {
  static forRoot(): ModuleWithProviders<AppCommonModule> {
    return {
      ngModule: AppCommonModule,
      providers: [
        AppNavigationService,
        WINDOW_PROVIDERS,
      ]
    };
  }
}
