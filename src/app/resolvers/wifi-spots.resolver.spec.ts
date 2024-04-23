import { TestBed } from '@angular/core/testing';

import { WifiSpotsResolver } from './wifi-spots.resolver';

describe('WifiSpotsResolver', () => {
  let resolver: WifiSpotsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WifiSpotsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
