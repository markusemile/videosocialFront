import { TestBed } from '@angular/core/testing';

import { LocaldbService } from './localdb.service';
import { MessageService, Message } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

describe('LocaldbService', () => {
  let service: LocaldbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ], providers: [
        MessageService
      ]
    });
    service = TestBed.inject(LocaldbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
