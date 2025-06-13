import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtDailyCollectionComponent } from './ht-daily-collection.component';

describe('HtDailyCollectionComponent', () => {
  let component: HtDailyCollectionComponent;
  let fixture: ComponentFixture<HtDailyCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtDailyCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtDailyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
