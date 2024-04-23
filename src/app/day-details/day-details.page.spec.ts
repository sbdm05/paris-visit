import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayDetailsPage } from './day-details.page';

describe('DayDetailsPage', () => {
  let component: DayDetailsPage;
  let fixture: ComponentFixture<DayDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DayDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
