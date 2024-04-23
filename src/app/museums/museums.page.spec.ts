import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MuseumsPage } from './museums.page';

describe('MuseumsPage', () => {
  let component: MuseumsPage;
  let fixture: ComponentFixture<MuseumsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MuseumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
