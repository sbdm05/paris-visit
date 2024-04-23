import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayManagementPage } from './day-management.page';

describe('DayManagementPage', () => {
  let component: DayManagementPage;
  let fixture: ComponentFixture<DayManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DayManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
