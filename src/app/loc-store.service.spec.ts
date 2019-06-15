import { TestBed } from '@angular/core/testing';

import { LocStoreService } from './loc-store.service';

describe('LocStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocStoreService = TestBed.get(LocStoreService);
    expect(service).toBeTruthy();
  });
});
