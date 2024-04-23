import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapMainPage } from './map-main.page';

describe('MapMainPage', () => {
  let component: MapMainPage;
  let fixture: ComponentFixture<MapMainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
