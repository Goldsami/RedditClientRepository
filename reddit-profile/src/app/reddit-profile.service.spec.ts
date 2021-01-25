import { TestBed } from '@angular/core/testing';

import { RedditProfileService } from './services/reddit-profile.service';

describe('RedditProfileService', () => {
  let service: RedditProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedditProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
