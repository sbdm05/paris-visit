import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MuseumsDetailsPage } from './museums-details.page';

describe('MuseumsDetailsPage', () => {
  let component: MuseumsDetailsPage;
  let fixture: ComponentFixture<MuseumsDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MuseumsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
