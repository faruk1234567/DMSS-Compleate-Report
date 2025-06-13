import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtDailyReportComponent } from './ht-daily-report.component';

describe('HtDailyReportComponent', () => {
  let component: HtDailyReportComponent;
  let fixture: ComponentFixture<HtDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtDailyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
