import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToursListDetailsPage } from './tours-list-details.page';

describe('ToursListDetailsPage', () => {
  let component: ToursListDetailsPage;
  let fixture: ComponentFixture<ToursListDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ToursListDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
