import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaladesListPage } from './balades-list.page';

describe('BaladesListPage', () => {
  let component: BaladesListPage;
  let fixture: ComponentFixture<BaladesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BaladesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
