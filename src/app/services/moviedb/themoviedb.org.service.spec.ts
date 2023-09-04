import { TestBed } from '@angular/core/testing';

import { ThemoviedbOrgService } from './themoviedb.org.service';

describe('ThemoviedbOrgService', () => {
  let service: ThemoviedbOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemoviedbOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
