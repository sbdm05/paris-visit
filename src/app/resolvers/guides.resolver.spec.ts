import { TestBed } from '@angular/core/testing';

import { GuidesResolver } from './guides.resolver';

describe('GuidesResolver', () => {
  let resolver: GuidesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GuidesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
