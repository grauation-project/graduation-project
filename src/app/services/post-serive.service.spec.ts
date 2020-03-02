import { TestBed } from '@angular/core/testing';

import { PostSeriveService } from './post-serive.service';

describe('PostSeriveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostSeriveService = TestBed.get(PostSeriveService);
    expect(service).toBeTruthy();
  });
});
