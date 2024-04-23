import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaladesListDetailsPage } from './balades-list-details.page';

describe('BaladesListDetailsPage', () => {
  let component: BaladesListDetailsPage;
  let fixture: ComponentFixture<BaladesListDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BaladesListDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
