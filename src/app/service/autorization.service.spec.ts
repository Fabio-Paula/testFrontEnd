import { TestBed } from '@angular/core/testing';

import { autorizationService } from './autorization.service';

describe('AutorizationService', () => {
  let service: autorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(autorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
