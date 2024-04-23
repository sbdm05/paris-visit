import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabActivitiesPage } from './tab-activities.page';

describe('TabActivitiesPage', () => {
  let component: TabActivitiesPage;
  let fixture: ComponentFixture<TabActivitiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
