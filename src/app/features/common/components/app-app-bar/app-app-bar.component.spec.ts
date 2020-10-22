import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAppBarComponent } from './app-app-bar.component';

describe('AppAppBarComponent', () => {
  let component: AppAppBarComponent;
  let fixture: ComponentFixture<AppAppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAppBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
