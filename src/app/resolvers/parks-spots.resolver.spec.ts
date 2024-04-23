import { TestBed } from '@angular/core/testing';

import { ParksSpotsResolver } from './parks-spots.resolver';

describe('ParksSpotsResolver', () => {
  let resolver: ParksSpotsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ParksSpotsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
