import { TestBed } from '@angular/core/testing';

import { DonatationService } from './donatation.service';

describe('DonatationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonatationService = TestBed.get(DonatationService);
    expect(service).toBeTruthy();
  });
});
