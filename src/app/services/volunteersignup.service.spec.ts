import { TestBed } from '@angular/core/testing';

import { VolunteersignupService } from './volunteersignup.service';

describe('VolunteersignupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolunteersignupService = TestBed.get(VolunteersignupService);
    expect(service).toBeTruthy();
  });
});
