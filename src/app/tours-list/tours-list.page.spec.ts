import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToursListPage } from './tours-list.page';

describe('ToursListPage', () => {
  let component: ToursListPage;
  let fixture: ComponentFixture<ToursListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ToursListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
