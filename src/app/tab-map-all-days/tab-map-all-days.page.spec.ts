import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabMapAllDaysPage } from './tab-map-all-days.page';

describe('TabMapAllDaysPage', () => {
  let component: TabMapAllDaysPage;
  let fixture: ComponentFixture<TabMapAllDaysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabMapAllDaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
