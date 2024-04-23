import { TestBed } from '@angular/core/testing';

import { BaladesResolver } from './balades.resolver';

describe('BaladesResolver', () => {
  let resolver: BaladesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BaladesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
