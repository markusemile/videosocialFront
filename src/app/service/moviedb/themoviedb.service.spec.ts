import { TestBed } from '@angular/core/testing';

import { ThemoviedbService } from './themoviedb.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ThemoviedbService', () => {
  let service: ThemoviedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ThemoviedbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
