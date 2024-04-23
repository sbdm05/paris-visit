import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapCustomPage } from './map-custom.page';

describe('MapCustomPage', () => {
  let component: MapCustomPage;
  let fixture: ComponentFixture<MapCustomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapCustomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
