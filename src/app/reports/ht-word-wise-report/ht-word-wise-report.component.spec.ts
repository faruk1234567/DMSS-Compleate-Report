import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtWardDailyReportComponent } from './ht-word-wise-report.component';

describe('HtWardDailyReportComponent', () => {
  let component: HtWardDailyReportComponent;
  let fixture: ComponentFixture<HtWardDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtWardDailyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtWardDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
