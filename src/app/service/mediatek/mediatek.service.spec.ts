import { TestBed } from '@angular/core/testing';

import { MediatekService } from './mediatek.service';
import { HttpClientModule } from '@angular/common/http';

describe('MediatekService', () => {
  let service: MediatekService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(MediatekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
