import { TestBed } from '@angular/core/testing';

import { ToiletsSpotsResolver } from './toilets-spots.resolver';

describe('ToiletsSpotsResolver', () => {
  let resolver: ToiletsSpotsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ToiletsSpotsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
