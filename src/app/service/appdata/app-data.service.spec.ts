import { TestBed } from '@angular/core/testing';

import { AppDataService } from './app-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppDataService', () => {
  let service: AppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AppDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
