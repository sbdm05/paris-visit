import { TestBed } from '@angular/core/testing';

import { MuseesResolver } from './musees.resolver';

describe('MuseesResolver', () => {
  let resolver: MuseesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MuseesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
