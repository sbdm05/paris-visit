import { TestBed } from '@angular/core/testing';

import { LocalStorageCustomPlansResolver } from './local-storage-custom-plans.resolver';

describe('LocalStorageCustomPlansResolver', () => {
  let resolver: LocalStorageCustomPlansResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LocalStorageCustomPlansResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
