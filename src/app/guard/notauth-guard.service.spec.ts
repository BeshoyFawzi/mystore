import { TestBed } from '@angular/core/testing';

import { NotauthGuardService } from './notauth-guard.service';

describe('NotauthGuardService', () => {
  let service: NotauthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotauthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
